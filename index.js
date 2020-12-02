const ACCESS_KEY = "f4efb26b5f19e9b1a002b67d6c63b5da60c455cd83c942ae86de5f6b29bb3894";

window.addEventListener("load", get_time());
window.addEventListener("load", opener(false));
document.getElementById("resetter").addEventListener("click", function() {
    document.getElementById('error').style.display = "none";
    resetCookie("username");
    resetCookie("interest");
    resetCookie("picture");
    resetJoke();
    opener(false);
});
document.getElementById("intereset").addEventListener("click", function() {
    resetCookie("interest");
    document.getElementById('error').style.display = "none";
    opener(false);
})

function resetCookie(type) {
    document.cookie = type + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function resetJoke() {
    document.getElementById("fact").innerHTML = "";
}

var jokeButt = document.getElementById("joke");
jokeButt.addEventListener("click", function() { joke(); })

var jokeBeGone = document.getElementById("byeJoke");
jokeBeGone.addEventListener("click", function() { 
    resetJoke();
    jokeBeGone.style.visibility = "hidden";
    document.getElementById("joke").innerHTML = "gimme fact"
})
var jokeAnswer = "";
var revealJoke = document.getElementById("reveal");
revealJoke.addEventListener("click", function() {
    document.getElementById("answer").innerHTML = jokeAnswer;
    document.getElementById("answer").style.display = "block";
    revealJoke.style.visibility = "hidden";
})

function get_time() {
    var today = new Date();
    var time = today.getHours();
    
    if (time > 1 && time < 4) dayTime = "why";
    else if (time >= 4 && time < 12) dayTime = "morning";
    else if (time >= 12 && time < 15) dayTime = "afternoon";
    else if (time >= 15 && time < 17) dayTime = "nothing";
    else if (time >= 17 && time < 22) dayTime = "evening";
    else if (time > 22 || time < 1) dayTime = "night";
    if (time > 12) time -= 12;
    if (time == 0) time = 12;
    var minutes = today.getMinutes();
    time += ":";
    if (minutes < 10) time += "0";
    time += minutes;
    document.getElementById("time").innerHTML = time;
    fadeIn("time");
    time = today.toLocaleDateString('en-US', { weekday: "short", year: 'numeric', month: 'short', day: 'numeric'});
    if (time.search("Dec 28") != -1) dayTime = "birthday";
    document.getElementById("date").innerHTML = time;
    setInterval(get_time, 1000);
}

var dayTime = "";
function opener(newImg) {
    var username = getCookie("username");
    var new_pic = getCookie("picture");
    if (new_pic == "") {
        new_pic = "https://images.unsplash.com/photo-1572270907014-c31da1c54124?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80";
        document.body.style.backgroundColor = "darkgray";
        var x = document.getElementById("loader");
        x.style.visibility = "visible";
        var img = new Image();
        img.src = new_pic;
        img.onload = () => {
            x.style.visibility = "hidden";
            document.body.style.backgroundColor = "transparent";
            document.body.style.backgroundImage = "url(\"" + new_pic + "\")";
        }
    } else {
        document.body.style.backgroundColor = "darkgray";
        var x = document.getElementById("loader");
        x.style.visibility = "visible";
        var img = new Image();
        img.src = new_pic;
        img.onload = () => {
            x.style.visibility = "hidden";
            document.body.style.backgroundColor = "transparent";
            document.body.style.backgroundImage = "url(\"" + new_pic + "\")";
        }
    }

    if (username == "") {
        document.getElementById("intereset").style.display = "none";
        document.getElementById("interest").style.display = "none";
        document.getElementById("exist").style.display = "none";
        document.getElementById("interestform").style.display = "none";
        document.getElementById("nameform").value = "";
        fadeIn("intro");
        fadeIn("nameform");
    } else { 
        // hide who
        document.getElementById("intro").style.display = "none";
        document.getElementById("nameform").style.display = "none"; 
        // display hi
        var open = document.getElementById("exist");
        open.innerHTML = intro();
        if (dayTime != "birthday") open.innerHTML += username;
        fadeIn("exist");
        // find interest
        var interest = getCookie("interest");
        if (interest == "") {
            fadeIn("interest");
            document.getElementById("interestform").value = "";
            fadeIn("interestform");
            document.getElementById("intereset").style.display = "none";
            return;
        }
        document.getElementById("interest").style.display = "none";
        document.getElementById("interestform").style.display = "none";
        fadeIn("intereset");
        if (interest.toLowerCase() == "nothing") return;
        if (newImg) {
            image(interest);
        }
        
    }
}

function fadeIn(elt) {
    document.getElementById(elt).style.animation = "fadeIn .5s linear";
    document.getElementById(elt).style.display = "block";
}

function fadeOut(elt) {
    var gone = document.getElementById(elt);
    gone.addEventListener("animationend", function(element) {
        if (element.type === "animationend" && element.animationName == "fadeOut") {
            gone.style.display = "none";
        }
    });
    gone.style.animation = "fadeOut .5s linear";
}

function intro() {
    if (dayTime == "birthday") return "happy birthday louis <br> ヾ(〃^∇^)ﾉ !!!"
        else if (dayTime == "why") return "why are you up, ";
        else if (dayTime == "morning") return "good morning, ";
        else if (dayTime == "afternoon") return "good afternoon, ";
        else if (dayTime == "nothing") return "hello, ";
        else if (dayTime == "evening") return "good evening, ";
        else return "goodnight, ";
}

function image(interest) {
    if (!ACCESS_KEY) {
        alert("please get a new access key");
        return;
    }
    var url = "https://api.unsplash.com/search/photos?query=" + interest + "&per_page=20&orientation=landscape&client_id=" + ACCESS_KEY;
    var data = new XMLHttpRequest();
    data.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            var info = this.responseText;
            var new_pic = info.search("\"raw\":");
            new_pic += 7; // size of "raw:" + 1
            info = info.slice(new_pic);
            var end_url = info.search("\"");
            new_pic = info.slice(0, end_url);
            setCookie("picture", new_pic);
            document.body.style.backgroundColor = "darkgray";
            var x = document.getElementById("loader");
            x.style.visibility = "visible";
            var img = new Image();
            img.src = new_pic;
            img.onload = () => {
                x.style.visibility = "hidden";
                document.body.style.backgroundColor = "transparent";
                document.body.style.backgroundImage = "url(\"" + new_pic + "\")";
            }
        }
      };
      data.onerror = function() {
          document.getElementById('error').style.display = "block";
          document.getElementById('error').innerHTML = "picture machine broke :(";
      }
    data.open("GET", url, true);
    data.send();   
}

function joke() {
    var url = "https://uselessfacts.jsph.pl/random.json?language=en";
    var joker = new XMLHttpRequest();
    joker.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var info = this.responseText;
            console.log(info);
            var joke = info.search(",\"text\":\"");
            joke += 9;
            info = info.slice(joke);
            joke = info.search(",\"source\"");
            joke -= 1;
            info = info.slice(0, joke);
            info = info.replace(/\\u00a0/g, " ")
            info = info.replace(/\\\"/g, '"');
            info = info.replace(/\\u2013/g, '-');
            info = info.replace(/`/g, "'");

            document.getElementById("fact").innerHTML = info;
            document.getElementById("fact").style.display = "inherit";
            document.getElementById("fact").style.width = "auto"
            document.getElementById("joke").innerHTML = "new fact pls";
            document.getElementById("byeJoke").style.visibility = "visible";
        }
    }
    joker.onerror = function() {
        x.style.visibility = "hidden";
        document.getElementById("answer").innerHTML = "";
        document.getElementById("answer").style.display = "none";
        document.getElementById("reveal").style.visibility = "hidden";    
        document.getElementById("punchline").innerHTML = "fact machine broke :(";
        document.getElementById("joke").innerHTML = "new fact pls";
        document.getElementById("byeJoke").style.visibility = "visible";
    }
    
    var x = document.getElementById("loader");
    x.style.visibility = "visible";
    joker.open("GET", url, true);
    joker.send();
    
    joker.onload = () => {
        x.style.visibility = "hidden";
    }
}

var user = document.getElementById("nameform");
user.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        user = document.forms["name"]["nameform"].value;
        setCookie("username", user, 365);
        opener(false);
    }
});
var inter = document.getElementById("interestform");
inter.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        inter = document.forms["interested"]["interestform"].value;
        setCookie("interest", inter, 365);
        opener(true);
    }
});



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
