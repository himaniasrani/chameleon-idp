const { Provider } = require('oidc-provider');
var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001'
}));

const configuration = {
  // ... see the available options in Configuration options section
  clients: [{
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: ['https://jwt.io'], // using jwt.io as redirect_uri to show the ID Token contents
    response_types: ['id_token'],
    grant_types: ['implicit'],
    token_endpoint_auth_method: 'none',
  }],
  // ...
};

const oidc = new Provider('http://localhost:3000', configuration);

// express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
// oidc.callback()

app.use(oidc.callback())

// koa application for use with koa apps, see /examples/koa.js
// oidc.app

// or just expose a server standalone, see /examples/standalone.js
const server = app.listen(3000, () => {
  console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration');
});



