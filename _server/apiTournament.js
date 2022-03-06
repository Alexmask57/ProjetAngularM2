import * as sqlTournament from "./services/sqlTournament.js";
import * as sqlMatch from "./services/sqlMatch.js";
import _, {map} from 'underscore';

//get all tournaments
const listAll = async function (req, res) {
  console.log('Get all tournaments');

  const tournaments  = await sqlTournament.getAll();
  return res.status(200).json(tournaments);
}

//get tournament by id
//TODO check if id doesn't exist
const getById = async function (req, res) {
  var id = req.params['id'];
  console.log('Get tournament id : ' + id);

  const tournament = await sqlTournament.getById(id);
  const combats = await sqlMatch.getByIdTournoi(id);
  //ajout des combats au tournoi
  tournament[0]["combats"] = list_to_tree(combats.reverse())//reverse pour avoir le dernier match en premier dans la liste

  return res.status(200).json(tournament[0]);
}

//create a tournament
//TODO check if idUser exist
const create = async function (req, res, next) {
  //parameters of tournament
  var json = req.body;


  try {
    //ajout tournoi bdd
    var idT = (await sqlTournament.create(json)).insertId;

    //generation tournoi
    var tournament = getBracket(idT, json.participants);
    console.log();

    //ajout matchs bdd
    for(const combat of tournament) {
      let idC = (await sqlMatch.create(combat)).insertId;
    }
  } catch (e) {
    console.log("ERROR TOURNAMENT : " + e);
    next(e);
  }
  res.status(201);
  res.send();
}

//update a tournament
//TODO check if id doesn't exist
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
//TODO check if id doesn't exist
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
// TODO check if body isn't empty
const winnerMatch = async function (req, res, next) {
  var idM = req.params['idM'];
  var winner = req.body.winner;

  try {
    //si il s'agit du dernier match du tournoi, on indique que le tournoi est terminé
    let match = (await sqlMatch.getById(idM))[0];
    console.log(match);
    if(match.idParent == null) {
      await sqlTournament.setTermine(match.idTournoi);
    }

    res.json(await sqlMatch.setWinner(idM, winner));
  } catch (err) {
    console.error("ERROR !! : " + err);
    next(err);
  }
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
      user1: {"pseudo": "", "personnage": ""},
      user2: {"pseudo": "", "personnage": ""}
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
    /*fbRound.lastGames = fbRound.lastGames.filter(game =>
      {
      let lastRound = brackets.find(bRound => bRound.bracketNo == game);
      return lastRound.bye == false;
      }
    );*/
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

export {listAll, getById, create, update, remove, winnerMatch}
