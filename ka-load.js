function loadLCKA() {
  var request = {};
  var pairs = location.search.substring(1).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    request[pair[0]] = pair[1];
  }

  const titles = ["Fractals", "Gravity Simulator", "MJ-18G", "RR nSpire KA"];
  const captions = [
    "A compilation of currently two fractals. There'll be more at some point. Maybe. It works much better when viewed on Khan Academy.",
    "This thing is currently nothing. I'm trying to create an object constructor that can create physical particles and update them.",
    "(by Matthew Johnson) This guy is still being made, but it can do quite a bit. It has three different keyboards selectable that allow a range of new characters and functions.",
    "This thing is written by Ray Redondo, and, while it is still WIP, is more of a feat in my opinion that the MJ-18G.<br>MJ: I disagree completely, but whatever."
  ];
  const urls = [
    "https://www.khanacademy.org/computer-programming/fractals/5846269720297472",
    "https://www.khanacademy.org/computer-programming/particle-attraction-simulation/4722166975725568",
    "https://www.khanacademy.org/computer-programming/mj-18g-working-developer-hardware",
    "https://www.khanacademy.org/computer-programming/rr-nspire-ka/4616184389369856"
  ];
  const iframes = [
    "<iframe src=\"https://www.khanacademy.org/computer-programming/fractals/5846269720297472/embedded?id=1529027330658-0.8335396434526652&amp;origin=https%3A%2F%2Flc-webpage.glitch.me&amp;author=no&amp;height=600&amp;buttons=yes&amp;width=600&amp;editor=no&amp;embed=yes\" frameborder=\"0\" scrolling=\"no\" style=\"border: 0px; width: 602px; height: 640px;\"></iframe>",
    "<iframe src=\"https://www.khanacademy.org/computer-programming/particle-attraction-simulation/4722166975725568/embedded?id=1529026543042-0.9462170238657266&amp;origin=https%3A%2F%2Flc-webpage.glitch.me&amp;buttons=yes&amp;embed=yes&amp;editor=no&amp;author=yes\" frameborder=\"0\" scrolling=\"no\" style=\"border: 0px; width: 402px; height: 440px;\"></iframe>",
    "<iframe src=\"https://www.khanacademy.org/computer-programming/mj-18g-working-developer-hardware/6542842693353472/embedded?id=1529027409517-0.6834731225651804&amp;origin=https%3A%2F%2Flc-webpage.glitch.me&amp;buttons=yes&amp;embed=yes&amp;author=no&amp;editor=no&amp;height=600\" frameborder=\"0\" scrolling=\"no\" style=\"border: 0px; width: 402px; height: 640px;\"></iframe>",
    "<iframe src=\"https://www.khanacademy.org/computer-programming/rr-nspire-ka/4616184389369856/embedded?id=1529027455767-0.49672716369907577&amp;origin=https%3A%2F%2Flc-webpage.glitch.me&amp;author=no&amp;height=600&amp;buttons=yes&amp;width=600&amp;editor=no&amp;embed=yes\" frameborder=\"0\" scrolling=\no\ style=\"border: 0px; width: 602px; height: 640px;\"></iframe>"
  ];
  
  document.getElementById("lc-ka-container").innerHTML = "<h1>" + titles[request.id] + "</h1><button onclick=\"location.href = '" + urls[request.id] + "'\">View on Khan Academy</button><p>" + iframes[request.id] + "</p><p class=\"border\">" + captions[request.id] + "</p>";
}