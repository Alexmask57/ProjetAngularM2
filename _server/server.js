import express from "express"
import * as apiUser from "./apiUser.js"
import * as apiCharacter from "./apiCharacter.js"
import * as apiTournament from "./apiTournament.js"
import {url} from "./url.js";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import {swaggerDoc} from "./openapi/openapi.js";


const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
  next();
});

// JSON API USER
app.get(url._userUrl, apiUser.listAll);
app.get(url._userUrl + '/:id', apiUser.getById);
app.post(url._userUrl, apiUser.create);
app.put(url._userUrl + '/:id', apiUser.update);
app.delete(url._userUrl + '/:id', apiUser.remove);

//JSON API PERSONNAGE (FOR INIT PURPOSE ONLY)
app.post(url._charUrl, apiCharacter.create);

//JSON API TOURNAMENT
app.get(url._tournamentUrl, apiTournament.listAll);
app.get(url._tournamentUrl + '/open', apiTournament.listAllOpen);
app.get(url._tournamentUrl + '/:id', apiTournament.getById);
app.post(url._tournamentUrl, apiTournament.create);
app.put(url._tournamentUrl + '/:id', apiTournament.update);
app.delete(url._tournamentUrl + '/:id', apiTournament.remove);

app.put(url._tournamentUrl + '/winner/:idM', apiTournament.winnerMatch);

app.listen(app.get('port'), function () {
  console.log('✔ Express server listening on http://localhost:%d/', app.get('port'));
})
