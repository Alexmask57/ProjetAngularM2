import * as user from "./services/sqlUser.js";

//get all users
const listAll = async function (req, res) {
  console.log('List all USERS');
  return res.status(200).json(await user.getAll());
}

//get user by id
//TODO check if id doesn't exist
const getById = async function (req, res) {
  var id = req.params['id'];
  console.log('Get user id : ' + id);
  return res.status(200).json(await user.getById(id));
}

//create a user
const create = async function (req, res, next) {
  var json = req.body;
  console.log('Add a user');

  try {
    return res.status(201).json(await user.create(json));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

//update a user
//TODO check if id doesn't exist
const update = async function (req, res, next) {
  var id = req.params['id'];
  var json = req.body;
  console.log('Update user id : ' + id);
  try {
    res.json(await user.update(id, json));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

//delete a user
//TODO check if id doesn't exist
const remove = async function (req, res, next) {
  var id = req.params['id'];
  console.log('Delete user id : ' + id);
  try {
    res.json(await user.remove(id));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

export {listAll, getById, create, update, remove}
