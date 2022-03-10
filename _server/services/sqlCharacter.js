import * as db from './db.js';

async function getAll() {
  const rows = await db.query('SELECT * FROM personnage');
  return rows;
}

async function getById(id) {
  const row = await db.query('SELECT * FROM personnage WHERE id = ?', [id]);
  return row;
}

async function getByName(name) {
  const row = await db.query('SELECT * FROM personnage WHERE nom = ?', [name]);
  return row;
}

async function create(character) {
  const result = await db.query('INSERT INTO personnage (nom) VALUES (?)', [character.nom]);
  return result;
}

export {getAll, getById, getByName, create}
