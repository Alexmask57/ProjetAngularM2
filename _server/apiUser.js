import * as user from "./services/sqlUser.js";
import {base64_decode, base64_encode} from "./encodingUtils.js";

//get all users
const listAll = async function (req, res) {
  console.log('List all USERS');
  const list = await user.getAll();
  list.map(usr => usr.photo = base64_encode(usr.photo));
  return res.status(200).json(list);
}

//get user by id
//TODO check if id doesn't exist
const getById = async function (req, res) {
  var id = req.params['id'];
  console.log('Get user id : ' + id);
  const list = await user.getById(id);
  list.map(usr => usr.photo = base64_encode(usr.photo));
  return res.status(200).json(list);
}

//create a user
const create = async function (req, res, next) {
  var json = req.body;
  console.log('Add a user');

  var response = getImgInfo(json.photo);


  base64_decode(json.pseudo, response.data, response.type);
  json.photo = json.pseudo + '.' + response.type;

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

  var response = getImgInfo(json.photo);

  base64_decode(json.pseudo, response.data, response.type);
  json.photo = json.pseudo + '.' + response.type;

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

function getImgInfo(base64) {
  var matches = base64.match(/^data:image\/([A-Za-z]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}

export {listAll, getById, create, update, remove}
