import { Nuggetmon } from "./Nuggetmon";

class NuggetMachine {
    constructor() {
        this.possibleNuggetmon = [
            "Nugget",
            "Kai",
            "Chill guy",
            "Kirby",
            "Waddle Dee",
            "Chao",
            "Beeg Yoshi",
            "Shy Guy",
            "Kung Fu Dugong",
            "Oshawott",
            "Pikachu",
            "Eevee",
            "Vaporeon",
            "Jeff the Land Shark",
            "Kendrick Lamar vs Drake",
            "Mickey Mouse",
            "DJ Khaled",
            "Chopper",
            "Pochita",
            "Winnie the Pooh",
            "Hello Kitty",
            "Teemo",
            "Pikmin Trio",
            "Rock Pikmin",
            "Purple Pikmin",
            "Bob the Builder",
            "Blues Clues",
            "The Squad",
            "Baby Groot",
            "Bob",
            "Totoro",
            "Katie",
            "Tutter",
            "Mike Wazowski",
            "Grimace",
            "Elmo",
            "Cookie Monster",
            "Bert and Ernie",
            "Stewie",
            "Peter",
            "Ted",
            "Jungkook",
            "Miga",
            "Quatchi",
            "Sumi",
            "Mukmuk",
            "Cinnamoroll",
            "Kuromi",
            "Pompompurin",
            "Gudetama",
            "Badtz-Maru",
            "Subway Surfers",
            "Fire Boy and Water Girl",
            "Om Nom",
            "Talking Tom",
            "Talking Ben",
            "Among Us",
            "Fall Guy",
            "Pablo",
            "Toopy and Binoo",
            "Pusheen",
            "Lightning McQueen",
            "Goku",
            "Lebron"
        ];
    }

    roll(user) {
        const rollCost = 120;
        if (user.subtractNuggets(rollCost)) {
            const randomIndex = Math.floor(Math.random() * this.possibleNuggetmon.length);
            const nuggetmonName = this.possibleNuggetmon[randomIndex];
            const newNuggetmon = new Nuggetmon(nuggetmonName, "", Date.now(), 0, 10, "");
            user.addNuggetmon(newNuggetmon);
        } else {
            console.log("Not enough nuggets to roll.");
        }
    }
}

export default NuggetMachine;