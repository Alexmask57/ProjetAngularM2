import * as db from "./db.js";

async function getAll() {
  const rows = await db.query('SELECT * FROM combat');
  return rows;
}

async function getById(id) {
  const row = await db.query('SELECT * FROM combat WHERE id = ?', [id]);
  return row;
}

async function getByBracket(idT, idB) {
  const row = await db.query('SELECT * FROM combat WHERE idTournoi = ? AND bracketNo = ?', [idT, idB]);
  return row;
}

async function getByIdTournoi(idT) {
  const rows = await db.query('SELECT * FROM combat WHERE idTournoi = ?', [idT]);
  return rows;
}

async function create(combat) {
  const result = await db.query('INSERT INTO combat (idUser1, idUser2, winner, niveau, idTournoi, idParent, bracketNo, idChar1, idChar2) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)', [combat.user1.idParticipant, combat.user2.idParticipant, combat.winner, combat.niveau, combat.idTournoi, combat.nextGame, combat.bracketNo]);
  return result;
}

async function update(id, combat) {
  const result = await db.query('UPDATE combat SET idUser1 = ?, idChar1 = ?, idUser2 = ?, idChar2 = ?, winner = ?, niveau = ?, idTournoi = ?, idParent = ?, bracketNo = ? WHERE id = ?',
    [combat.idUser1, combat.char1, combat.idUser2, combat.idChar2, combat.winner, combat.niveau, combat.idTournoi, combat.nextGame, bracketNo, id]);
  return result;
}

async function remove(id) {
  const result = await db.query('DELETE FROM combat WHERE id = ?', [id]);
  return result;
}

async function removeByIdTournoi(idT) {
  const result = await db.query('DELETE FROM combat WHERE idTournoi = ?', [idT]);
  return result;
}

async function setWinner(id, winner) {
  const result = await db.query('UPDATE combat SET winner = ? WHERE id = ?', [winner, id]);
  return result;
}

async function setNextMatch(id, position, idUser) {
  const result = await db.query('UPDATE combat SET idUser' + position + ' = ? WHERE id = ?', [idUser, id]);
  return result;
}

async function addCharacter(idM, idC1, idC2) {
  const result = await db.query('UPDATE combat SET idChar1 = ?, idChar2 = ? WHERE id = ?', [idC1, idC2, idM]);
  return result;
}

async function getStats() {
  const rows = await db.query('SELECT user.pseudo, \n' +
    '\tsum(case when combat.winner = user.id then 1 else 0 end) nbMatchs,\n' +
    '    sum(case when combat.winner = user.id AND combat.idParent IS NULL then 1 else 0 end) nbTournois\n' +
    'FROM user\n' +
    'LEFT JOIN combat\n' +
    'ON user.id = combat.winner\n' +
    'WHERE user.supprime = 0\n' +
    'GROUP BY user.id');
  return rows;
}

export {getAll, getByIdTournoi, getById, getByBracket, create, update, remove, removeByIdTournoi, setWinner, setNextMatch, addCharacter, getStats}
