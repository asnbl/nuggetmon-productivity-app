import { Nuggetmon } from "./Nuggetmon";

class User {
    name;
    currentNuggetmon;
    nuggets;
    nuggetdex;

    constructor(name) {
        this.name = name;
        this.currentNuggetmon = ["Nugget"];
        this.nuggets = 0;
        this.nuggetdex = {
            "Nugget": true,
            "Kai": false,
            "Chill Guy": false,
            "Kirby": false,
            "Bandana Dee": false,
            "Chao": false,
            "Beeg Yoshi": false,
            "Shy Guy": false,
            "Kung Fu Dugong": false,
            "Oshawott": false,
            "Pikachu": false,
            "Eevee": false,
            "Vaporeon": false,
            "Jeff the Land Shark": false,
            "Kendrick Lamar vs. Drake": false,
            "Mickey Mouse": false,
            "DJ Khaled": false,
            "Chopper": false,
            "Pochita": false,
            "Winnie the Pooh": false,
            "Hello Kitty": false,
            "Teemo": false,
            "Pikmin Trio": false,
            "Rock Pikmin": false,
            "Purple Pikmin": false,
            "Bob the Builder": false,
            "Blue's Clues": false,
            "Dora and Boots": false,
            "Baby Groot": false,
            "Bob the Minion": false,
            "Totoro": false,
            "Katie": false,
            "Tutter": false,
            "Mike Wazowski": false,
            "Grimace": false,
            "Elmo": false,
            "Cookie Monster": false,
            "Bert and Ernie": false,
            "Stewie": false,
            "Peter": false,
            "Ted": false,
            "Jungkook": false,
            "Miga": false,
            "Quatchi": false,
            "Sumi": false,
            "Mukmuk": false,
            "Cinnamoroll": false,
            "Kuromi": false,
            "Pompompurin": false,
            "Gudetama": false,
            "Badtz-Maru": false,
            "Subway Surfers": false,
            "Fire Boy and Water Girl": false,
            "Om Nom": false,
            "Talking Tom": false,
            "Talking Ben": false,
            "Among Us": false,
            "Fall Guy": false,
            "Pablo": false,
            "Toopy and Binoo": false,
            "Pusheen": false,
            "Lightning McQueen": false,
            "Goku": false,
            "LeBron": false
        };        
    }

    addNuggets(amount) {
        this.nuggets += amount;
    }

    subtractNuggets(amount) {
        if (this.nuggets >= amount) {
            this.nuggets -= amount;
            return true;
        }
        return false;
    }

    addNuggetmon(nuggetmon) {
        this.currentNuggetmon.push(nuggetmon);
        if (!this.nuggetdex[nuggetmon.name]) {
            this.nuggetdex[nuggetmon.name] = true;
        }
    }
    removeNuggetmon(name) {
        const index = this.currentNuggetmon.indexOf(name);
        if (index > -1) {
            this.currentNuggetmon.splice(index, 1);
        }
    }


    getNuggets() {
        return this.nuggets;
    }
}

export default User;