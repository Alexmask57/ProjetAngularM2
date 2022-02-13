import * as db from "./db.js";

async function getAll() {
  const rows = await db.query('SELECT * FROM user');

  return rows;
}

export {getAll}
