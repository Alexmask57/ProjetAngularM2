import * as user from "./services/user.js";

const listAll = async function (req, res) {
  console.log('List all USERS');
  return res.json(await user.getAll());
}

export {listAll}
