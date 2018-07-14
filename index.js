const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const readline = require('readline');
const child = require('child_process');
const strint = require('./strint');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const stdin = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var siteDown = false;

app.use((req, res, next) => {
  if (siteDown) {
    res.status(500).send("The site is temporarily down. It'll be back soon!");
  } else {
    next();
  }
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser()); // support cookies

app.use('/', express.static(__dirname + '/'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/418', (request, response) => {
  response.status(418).json({ message: "I'm a teapot!" });
});

var curUsers = {};
var curSTTTGames = {};

app.get('/currentUser', (request, response) => {
  console.log("Fetching /currentUser...");
  console.log("from ip "+request.ip);
  console.log("with token "+request.cookies.token);
  if(!curUsers[request.cookies.token]) {
    response.status(200).send("--NOTLOGGEDIN");
  } else {
    response.status(200).send(curUsers[request.cookies.token]);
  }
});

app.get('/header.html', (request, response) => {
  if(curUsers[request.cookies.token]) {
    response.status(200).send(fs.readFileSync('/app/headerLOGGEDIN.html'));
  } else {
    response.status(200).send(fs.readFileSync('/app/headerSTANDARD.html'));
  }
});

app.post('/login.html', (request, response) => {
  var uname = request.body.uname;
  var passwd = request.body.passwd;
  var passwdHash = "1089357896855742840";
  for(var i = 0; i < passwd.length; i++) {
    passwdHash = strint.mul(passwdHash, ""+strint.mul(""+passwd.charCodeAt(i), ""+passwd.charCodeAt((i*i+1) % passwd.length)));
    while(strint.ge(passwdHash, "18446744073709551616")) {
      passwdHash = strint.sub(passwdHash, "18446744073709551616");
    }
  }
  var info = child.execFileSync("/app/login-helper", ["login", uname, passwdHash]).toString("ascii");
  if(info === "INVALID") {
    response.status(200).send("<html><head><script>location.href = 'https://lc-webpage.glitch.me/loginPage.html?failed=true&return=" + decodeURIComponent(request.body.return) + "';</script></head><body></body></html>");
  } else {
    var token = Math.floor(Math.random()*0xFFFFFFFFFFFFFFFF);
    curUsers[token] = uname;
    response.status(200).send("<html><head><script>document.cookie = 'token=" + token + "';location.href = '" + decodeURIComponent(request.body.return) + "';</script></head><body></body></html>");
  }
});

app.post('/signup.html', (request, response) => {
  var uname = request.body.uname;
  var passwd = request.body.passwd;
  var passwdC = request.body.passwdC;
  if(passwd != passwdC) {
    response.status(200).send("<html><head><script>location.href = 'https://lc-webpage.glitch.me/signupPage.html?failed=true&return=" + decodeURIComponent(request.body.return) + "';</script></head><body></body></html>");
    return;
  }
  var passwdHash = "1089357896855742840";
  for(var i = 0; i < passwd.length; i++) {
    passwdHash = strint.mul(passwdHash, ""+strint.mul(""+passwd.charCodeAt(i), ""+passwd.charCodeAt((i*i+1) % passwd.length)));
    while(strint.ge(passwdHash, "18446744073709551616")) {
      passwdHash = strint.sub(passwdHash, "18446744073709551616");
    }
  }
  var info = child.execFileSync("/app/login-helper", ["signup", uname, passwdHash]).toString("ascii");
  response.status(200).send("<html><head><script>location.href = '" + decodeURIComponent(request.body.return) + "';</script></head><body></body></html>");
});

app.get('/logout.html', (request, response) => {
  curUsers[request.ip] = null;
  response.status(200).send("<html><head><script>document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';location.href = '" + decodeURIComponent(request.query.return) + "';</script></head><body></body></html>");
});

// Games
app.get('/stttGames.json', (request, response) => {
  if(!curUsers[request.cookies.token]) {
    response.send("{\"games\":[]}");
    return;
  }
  
  console.log(curUsers[request.cookies.token]);
  
  if(!curSTTTGames[curUsers[request.cookies.token]]) {
    response.send(curSTTTGames[curUsers[request.cookies.token]] = "{\"games\":[{\"opponent\":\"Tutorial\",\"state\":\"000000000000000000000000000000000000000000000000000000000000000000000000000000000\"}]}");
  } else {
    response.send(curSTTTGames[curUsers[request.cookies.token]]);
  }
  
  console.log(curSTTTGames[curUsers[request.cookies.token]]);
});

app.listen(process.env.PORT, () => {
  console.log('Started server on port ' + process.env.PORT);
});