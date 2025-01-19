import { Nuggetmon } from "./Nuggetmon";

class User {
    failedNuggetmon;
    currentNuggetmon;
    activeNuggetmon;
    nuggets;
    nuggetdex;

    constructor() {
        this.failedNuggetmon = 0;
        this.currentNuggetmon = [new Nuggetmon("Nugget", "src/images/nugget.png")];
        this.activeNuggetmon = this.currentNuggetmon[0];
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

removeNuggetmon(nuggetmon) {
    if (!nuggetmon || !nuggetmon.name) {
        console.error("Invalid Nuggetmon object passed:", nuggetmon);
        return;
    }

    const index = this.currentNuggetmon.findIndex(n => n.name === nuggetmon.name);
    if (index > -1) {
        this.failedNuggetmon++;
        this.currentNuggetmon.splice(index, 1);
        console.log(`${nuggetmon.name} has been removed from your Nuggetmon collection.`);
    } else {
        console.warn(`Nuggetmon with name "${nuggetmon.name}" not found in the collection.`);
    }
}

getActiveNuggetmon() {
    return this.activeNuggetmon;
}

setActiveNuggetmon(nuggetmon) {
    if (nuggetmon instanceof Nuggetmon) {
        this.activeNuggetmon = nuggetmon;
    } else {
        console.error("Invalid Nuggetmon object passed:", nuggetmon);
    }
}

getNuggetmonByName(name) {
    return this.currentNuggetmon.find(nuggetmon => nuggetmon.name === name) || null;
}

    getNuggets() {
        return this.nuggets;
    }
}

export default User;