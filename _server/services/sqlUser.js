import * as db from "./db.js";

async function getAll() {
  const rows = await db.query('SELECT * FROM user');
  return rows;
}

async function getById(id) {
  const row = await db.query('SELECT * FROM user WHERE id = ?', [id]);
  return row;
}

async function create(user) {
  const result = await db.query('INSERT INTO user (pseudo, photo) VALUES (?)', [user.pseudo, user.photo]);
  return result;
}

async function update(id, user) {
  const result = await db.query('UPDATE user SET pseudo = ?, photo = ? WHERE id = ?', [user.pseudo, user.photo, id]);
  return result;
}

async function remove(id) {
  const result = await db.query('DELETE FROM user WHERE id = ?', [id]);
}

export {getAll, getById, create, update, remove}
