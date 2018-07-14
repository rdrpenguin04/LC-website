function fetchSTTTGames() {
  fetch("/currentUser", {
    method: 'GET',
    credentials: 'include'
  }).then(function(response) {
    response.text().then(function(text) {
      if(text == "--NOTLOGGEDIN") {
        document.getElementById("currentGames").innerHTML = "<p class=\"border\">ERROR: YOU MUST BE LOGGED IN TO PLAY!</p>";
      }
      console.log(text);
    });
  });
  fetch("/stttGames.json", {
    method: 'GET',
    credentials: 'include'
  }).then(function(response) {
    response.text().then(function(text) {
      var games = JSON.parse(text).games;
      var gamesText = "<table><tr>";
      for(var i = 0; i < games.length; i++) {
        gamesText += "<td><h3>"+games[i].opponent+"</h3><br /><canvas id=\"previewCanvas"+i+"\" width=\"128\" height=\"128\"></canvas></td>";
        if(i%4==3 && i != games.length-1) {
          gamesText += "</tr><tr>";
        }
      }
      gamesText += "</tr></table>";
      document.getElementById("currentGames").innerHTML += gamesText;
    });
  });
}