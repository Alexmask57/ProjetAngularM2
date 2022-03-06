import * as db from './db.js';

async function getAll() {
  const rows = await db.query('SELECT * FROM tournoi');
  return rows;
}

async function getById(id) {
  const row = await db.query('SELECT * FROM tournoi WHERE id = ?', [id]);
  return row;
}

async function create(tournament) {
  const result = await db.query('INSERT INTO tournoi (date, etat) VALUES (?, ?)', [new Date(), "en cours"]);
  return result;
}

async function update(id, tournament) {
  const result = await db.query('UPDATE tournoi SET date = ?, etat = ? WHERE id = ?', [tournament.date, tournament.etat, id]);
  return result;
}

async function remove(id) {
  const result = await db.query('DELETE FROM tournoi WHERE id = ?', [id]);
  return result;
}

async function setTermine(id) {
  const result = await db.query('UPDATE tournoi SET etat = "terminé" WHERE id = ?', [id]);
  return result;
}

export {getAll, getById, create, update, remove, setTermine}
