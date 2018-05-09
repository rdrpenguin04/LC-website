fetch("/news.json").then(function(response) {
  response.text().then(function(text) {
    var newsText = "";
    var news = JSON.parse(text).news;
    for(var i = 0; i < news.length; i++) {
      newsText += "<hr /><h1>" + news[i].title + "</h1><h3>by " + news[i].author + "</h3><p>"+news[i].text+"</p>";
    }
    var newsDiv = document.getElementById("newsContent");
    newsDiv.innerHTML = newsText;
  });
});