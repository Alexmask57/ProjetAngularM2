const swaggerDoc = {
  openapi: '3.0.1',
  info: {
    version: '0.0.1',
    title: 'Smash tournament',
    description: 'Smash tournament API',
    contact: {
      name: 'blabla',
      email: 'bla@bla.com'
    }
  },
  servers: [{
    'url' : 'http://localhost:3000/'
  }],
  "paths": {
    "/user": {
      "get": {
        "description": "get ALL users",
        "responses": {
          "200": {
            "description": "OK"
          },
          "204": {
            "description": "No content"
          }
        }
      }
    }
  }
}

export {swaggerDoc}
