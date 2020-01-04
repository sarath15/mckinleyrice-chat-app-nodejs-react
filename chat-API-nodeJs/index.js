var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// GET API 
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});
 
app.post('/login', function(req, res, next){
    const {body:{email, password}} = req;
    if(email && password){
        if(email === "user@example.com" && password == "qwerty"){
          var token = jwt.sign({ email, password }, 'private');
          res.send({token});
        } else {
            res.status(500).send({
                message: "Invalid credentials."
            });
        }
    } else {
        res.status(500).send({
            message: "Username password sholud not be empty."
        });
    }
    res.end();
  });

/**
 * Expose a websocket on same port
 */
var aWss = expressWs.getWss('/');
app.ws('/', function(ws, req) {
    ws.send(JSON.stringify({
        name : "From Server",
        data : "Connected Enjoy!"
    }))
    ws.on('message', function (message) {
        message = JSON.parse(message)

        if (message.type == "key") {
            ws.authKey = message.data
            ws.clientName = message.name
            return
        }
        // broadcast message other than current user
        aWss.clients.forEach(function (client) {
            if (client.authKey == ws.authKey) {
                if (client != ws) {
                    client.send(JSON.stringify({
                        name : ws.clientName,
                        data : message.data
                    }))
                }
            }
        })
    })
});
 
app.listen(3001);