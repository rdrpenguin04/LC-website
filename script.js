var memory = [];

function goToPage(page) {
  location.href = "https://lc-webpage.glitch.me/" + page;
}

function setCookie(name, value) {
  document.cookie = name+"="+value;
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            updateLoginLink();
          }
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

function disableCookieBox() {
  window.onload = function() {
    window.setTimeout(function() {
      var name = "cookieNotice1=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          if(c.substring(name.length, c.length)) {
            document.getElementById('cookieNotice1').style.display='none';
          }
        }
      }
    },1);
  };
}

function updateLoginLink() {
  var loginALink = document.getElementById("loginALink");
  if(loginALink) {
    var curPage = location.href;
    loginALink.setAttribute("onclick", "goToPage('loginPage.html?return="+encodeURIComponent(curPage)+"'); return false");
  }
  var signupALink = document.getElementById("signupALink");
  if(signupALink) {
    var curPage = location.href;
    signupALink.setAttribute("onclick", "goToPage('signupPage.html?return="+encodeURIComponent(curPage)+"'); return false");
  }
  var logoutALink = document.getElementById("logoutALink");
  if(logoutALink) {
    var curPage = location.href;
    logoutALink.setAttribute("onclick", "goToPage('logout.html?return="+encodeURIComponent(curPage)+"'); return false");
  }
}