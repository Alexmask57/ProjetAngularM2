import * as sqlChar from "./services/sqlCharacter.js";

//add a character
const create = async function (req, res, next) {
  var json = req.body;
  console.log('Add a character');
  //console.log(json);
  try {
    return res.status(201).json(await sqlChar.create(json));
  } catch (e) {
    console.error("ERROR apiChar : " + e);
  }
}


export {create}
