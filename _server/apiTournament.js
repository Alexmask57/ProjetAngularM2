import * as sqlTournament from "./services/sqlTournament.js";
import * as sqlMatch from "./services/sqlMatch.js";
import * as sqlUser from "./services/sqlUser.js";
import * as sqlCharacter from "./services/sqlCharacter.js";
import {base64_encode} from "./encodingUtils.js";
import _, {map} from 'underscore';

//get all tournaments
const listAll = async function (req, res) {
  console.log('Get all tournaments');

  const tournaments  = await sqlTournament.getAll();
  return res.status(200).json(tournaments);
}

//get all opened tournaments
const listAllOpen = async function (req, res) {
  console.log('Get all opened tournaments');

  const tournaments  = await sqlTournament.getAllOpen();
  return res.status(200).json(tournaments);
}

//get tournament by id
//TODO check if id doesn't exist
const getById = async function (req, res) {
  var id = req.params['id'];
  console.log('Get tournament id : ' + id);

  return res.status(200).json(await getDetailTournoi(id));
}

//create a tournament
//TODO check if idUser exist
const create = async function (req, res, next) {
  console.log("Create tournament");
  //parameters of tournament
  var json = req.body;

  try {
    //ajout tournoi bdd
    var idT = (await sqlTournament.create(json.participants.length)).insertId;

    //generation tournoi
    var tournament = getBracket(idT, json.participants);


    //ajout matchs bdd
    for(const combat of tournament) {
      let idC = (await sqlMatch.create(combat)).insertId;
    }
    res.status(201).json(await getDetailTournoi(idT));
  } catch (e) {
    console.log("ERROR TOURNAMENT : " + e);
    next(e);
  }
}

//add character to a fight
const addCharacter = async function (req, res, next) {
  let idM = req.params['idM'];
  let json = req.body;
  console.log("Add characters fight id : " + idM);

  let idChar1 = 0;  //valeurs par défaut si il n'y a pas de personnage définis
  let idChar2 = 0;

  try {
    if(json.char1 != '')
      idChar1 = (await sqlCharacter.getByName(json.char1))[0].id;
    if(json.char2 != '')
      idChar2 = (await sqlCharacter.getByName(json.char2))[0].id;
    res.json(await sqlMatch.addCharacter(idM, idChar1, idChar2));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

//update a tournament
const update = async function (req, res, next) {
  var id = req.params['id'];
  var json = req.body;
  console.log("Update tournament id : " + id);

  try {
    res.json(await sqlTournament.update(id, json));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

//delete a tournament
const remove = async function (req, res, next) {
  var id = req.params['id'];
  console.log('Delete tournament id : ' + id);
  try {
    await sqlMatch.removeByIdTournoi(id);
    res.json(await sqlTournament.remove(id));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

//set winner for a tournament
const winnerMatch = async function (req, res, next) {
  var idM = req.params['idM'];
  var winner = req.body.winner;

  try {
    await sqlMatch.setWinner(idM, winner);
    let match = (await sqlMatch.getById(idM))[0];

    //si il s'agit du dernier match du tournoi, on indique que le tournoi est terminé
    if(match.idParent == null)
      await sqlTournament.setTermine(match.idTournoi);
    else {
      //sinon on complete le match suivant
      let nextMatch = (await sqlMatch.getByBracket(match.idTournoi, match.idParent))[0];
      if(match.winner == match.idUser1) {
        if(nextMatch.idUser1 == 0)
          await sqlMatch.setNextMatch(nextMatch.id, 1, match.idUser1);
        else
          await sqlMatch.setNextMatch(nextMatch.id, 2, match.idUser1);
      }
      else {
        if(nextMatch.idUser1 == 0)
          await sqlMatch.setNextMatch(nextMatch.id, 1, match.idUser2);
        else
          await sqlMatch.setNextMatch(nextMatch.id, 2, match.idUser2);
      }
    }

    res.json();
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
}

//recupere un tournoi avec tous ses macths
const getDetailTournoi = async function(id) {
  const tournament = await sqlTournament.getById(id);
  let combats = await sqlMatch.getByIdTournoi(id);

  //pour le combat on récupère les participants associés si ils existent
  for(let c of combats) {
    if(c.idUser1 != 0) {
      let user = (await sqlUser.getById(c.idUser1))[0];
      if(user.photo != "")
        user.photo = base64_encode(user.photo);
      c["participant1"] = user;
    }
    else
      c["participant1"] = {}

    if(c.idUser2 != 0) {
      let user = (await sqlUser.getById(c.idUser2))[0];
      if(user.photo != "")
        user.photo = base64_encode(user.photo);
      c["participant2"] = user;
    }
    else
      c["participant2"] = {}

    if(c.idChar1 != 0)
      c["personnage1"] = (await sqlCharacter.getById(c.idChar1))[0];
    else
      c["personnage1"] = {}

    if(c.idChar2 != 0)
      c["personnage2"] = (await sqlCharacter.getById(c.idChar2))[0];
    else
      c["personnage2"] = {}
  }

  //ajout des combats au tournoi
  tournament[0]["combats"] = list_to_tree(combats.reverse())//reverse pour avoir le dernier match en premier dans la liste

  return tournament[0];
}

//recuperer le nb de victoires par match et par tournoi
const getStats = async function(req, res, next) {
  console.log('get stats');
  let pseudo = [];
  let nbMatchs = [];
  let nbTournois = [];

  let stats = await sqlMatch.getStats();
  stats.forEach(stat => {
    pseudo.push(stat.pseudo);
    nbMatchs.push(stat.nbMatchs);
    nbTournois.push(stat.nbTournois);
  });

  res.json({"pseudo": pseudo, "nbMatchs": nbMatchs, "nbTournois": nbTournois});
}

function getBracket(idTournoi, participants) {
  var bracketCount = 0;

  var knownBrackets = [2,4,8,16,32];

  var base = participants.length;

  console.log(base);

  var closest 		= _.find(knownBrackets, function(k) { return k>=base; }),
    byes 			= closest-base;

  if(byes>0)	base = closest;

  var brackets 	= [],
    finalBrackets = [],
    round 		= 1,
    baseT 		= base/2,
    baseC 		= base/2,
    teamMark	= 0,
    nextInc		= base/2;

  for(let i=1;i<=(base-1);i++) {
    var baseR = i / baseT,
      isBye = false;

    if (byes > 0 && (i % 2 != 0 || byes >= (baseT - i))) {
      isBye = true;
      byes--;
    }

    var last = _.map(_.filter(brackets, function (b) {
      return b.nextGame == i;
    }), function (b) {
      return {game: b.bracketNo};
    });
    brackets.push({
      lastGames:	round==1 ? [] : [last[0].game,last[1].game],
      nextGame:	nextInc+i>base-1?null:nextInc+i,
      bracketNo:	i,
      niveau:	round,
      winner: "",
      bye:		isBye,
      user1: {"idParticipant": ""},
      user2: {"idParticipant": ""}
    });
    teamMark += 2;
    if (i % 2 != 0) nextInc--;
    while (baseR >= 1) {
      round++;
      baseC /= 2;
      baseT = baseT + baseC;
      baseR = i / baseT;
    }
  }
  //remove init round (bye=true)
  finalBrackets = brackets.filter(round => round.bye == false);
  //remove init round from lastGames and add idTournoi and add users
  finalBrackets.map(fbRound => {
    fbRound.lastGames = fbRound.lastGames.filter(game =>
      {
      let lastRound = brackets.find(bRound => bRound.bracketNo == game);
      return lastRound.bye == false;
      }
    );
    fbRound.idTournoi = idTournoi;
    if(participants.length > 0) {
      if(fbRound.lastGames.length == 0) {
        let index = getRandomInt(participants.length-1);
        fbRound.user1 = participants[index];
        participants.splice(index, 1);
        index = getRandomInt(participants.length-1);
        fbRound.user2 = participants[index];
        participants.splice(index, 1);
      }
      else if(fbRound.lastGames.length == 1) {
        let index = getRandomInt(participants.length-1);
        fbRound.user1 = participants[index];
        participants.splice(index, 1);
      }
      console.log("Participant after bracket : " + fbRound.bracketNo);
      console.log(participants);
    }
  }
  );

  return finalBrackets;
}

function list_to_tree(list) {
  var map = {}, node, roots = [], i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].bracketNo] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.idParent !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.idParent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export {listAll, getById, create, update, remove, winnerMatch, listAllOpen, addCharacter, getStats}
