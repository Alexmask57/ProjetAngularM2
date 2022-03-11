import * as db from "./db.js";

async function getAll() {
  const rows = await db.query('SELECT * FROM user WHERE supprime = 0');
  return rows;
}

async function getById(id) {
  const row = await db.query('SELECT * FROM user WHERE id = ?', [id]);
  return row;
}

async function create(user) {
  const result = await db.query('INSERT INTO user (pseudo, photo, supprime) VALUES (?, ?, 0)', [user.pseudo, user.photo]);
  return result;
}

async function update(id, user) {
  const result = await db.query('UPDATE user SET pseudo = ?, photo = ? WHERE id = ?', [user.pseudo, user.photo, id]);
  return result;
}

async function remove(id) {
  const result = await db.query('UPDATE user SET supprime = 1 WHERE id = ?', [id]);
  return result;
}

async function checkOnTournoi(id) {
  const result = await db.query('SELECT COUNT(*) AS result\n' +
    'FROM combat, tournoi\n' +
    'WHERE combat.idTournoi = tournoi.id\n' +
    'AND tournoi.etat = "en cours"\n' +
    'AND EXISTS (SELECT *\n' +
    '            FROM user\n' +
    '            WHERE user.id = combat.idUser1\n' +
    '            AND user.id = ?)\n' +
    'OR EXISTS (SELECT *\n' +
    '            FROM user\n' +
    '            WHERE user.id = combat.idUser2\n' +
    '            AND user.id = ?)', [id, id]);
  return result;
}

export {getAll, getById, create, update, remove, checkOnTournoi}
