import User from 'src/classes/User';

let user = new User();


var i = 0;
var original = document.getElementById('duplicater');

var style = window.getComputedStyle(document.body);


function duplicate() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i;
    // or clone.id = ""; if the divs don't need an ID
    // original.parentNode.appendChild(clone);
    // clone.classList.add('text-large');
    ++i;
    document.documentElement.style.setProperty('--anger-lvl', i + "%");

    document.getElementById("nugget-amt").innerHTML = i;

    original.after(clone);
}