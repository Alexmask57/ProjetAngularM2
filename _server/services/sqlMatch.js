import * as db from "./db.js";

async function getAll() {
  const rows = await db.query('SELECT * FROM combat');
  return rows;
}

async function getById(id) {
  const row = await db.query('SELECT * FROM combat WHERE id = ?', [id]);
  return row;
}

async function getByIdTournoi(idT) {
  const rows = await db.query('SELECT * FROM combat WHERE idTournoi = ?', [idT]);
  return rows;
}

async function create(combat) {
  const result = await db.query('INSERT INTO combat (idUser1, idChar1, idUser2, idChar2, winner, niveau, idTournoi, idParent, bracketNo) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [combat.user1.pseudo, combat.user1.personnage, combat.user2.pseudo, combat.user2.personnage, combat.winner, combat.niveau, combat.idTournoi, combat.nextGame, combat.bracketNo]);
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
}

export {getAll, getByIdTournoi, getById, create, update, remove, removeByIdTournoi, setWinner}
