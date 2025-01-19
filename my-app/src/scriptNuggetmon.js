import User from './User.js';

const user = new User();

let num = 0;

var original = document.getElementById('duplicater');

function duplicate(angerLevel, name, photoPath) {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "clone" + num++;
    // or clone.id = ""; if the divs don't need an ID
    // original.parentNode.appendChild(clone);
    var angerlvl = angerLevel / 20 * 100;
    document.documentElement.style.setProperty('--anger-lvl', angerlvl + "%");
    document.getElementById("nugget-name").innerHTML = name;
    document.getElementById("mon-img").setAttribute("src", photoPath);
    original.after(clone);
}

function main() {
    for (let i = 1; i < user.currentNuggetmon.length; i++) {
        var nuggetMon = user.currentNuggetmon[i];
        duplicate(nuggetMon.angerLevel, nuggetMon.name, nuggetMon.photoPath);
    }
}

main();
