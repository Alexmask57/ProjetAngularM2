import express from "express"
import * as apiUser from "./apiUser.js"
import {url} from "./url.js";
import swaggerUi from "swagger-ui-express";
import {swaggerDoc} from "./openapi/openapi.js";


const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}));

app.set('port', process.env.PORT || 3000);

// JSON API USER
app.get(url._userUrl, apiUser.listAll);

app.listen(app.get('port'), function () {
  console.log('✔ Express server listening on http://localhost:%d/', app.get('port'));
})
