import mysql from "mysql2/promise"
import {config} from "../config.js"

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);
  await connection.destroy();
  return results;
}

export {query}
