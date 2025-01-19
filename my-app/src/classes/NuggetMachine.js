import { Nuggetmon } from "./Nuggetmon";

class NuggetMachine {
    possibleNuggetmon;
    
    constructor() {
        this.possibleNuggetmon = {
            "Nugget": "src/images/nugget.png",
            "Kai": "src/images/kai.png",
            "Chill Guy": "src/images/chillguy.png",
            "Kirby": "src/images/kirby.png",
            "Bandana Dee": "src/images/waddledee.png",
            "Chao": "src/images/chao.png",
            "Beeg Yoshi": "src/images/beeg yoshi.png",
            "Shy Guy": "src/images/shyguy.png",
            "Kung Fu Dugong": "src/images/kungfudugong.png",
            "Oshawott": "src/images/oshawott.png",
            "Pikachu": "src/images/pikachu.png",
            "Eevee": "src/images/eevee.png",
            "Vaporeon": "src/images/vaporeon.png",
            "Jeff the Land Shark": "src/images/jeff.png",
            "Kendrick Lamar vs. Drake": "src/images/kendrickdrake.png",
            "Mickey Mouse": "src/images/mickey.png",
            "DJ Khaled": "src/images/djkhaled.png",
            "Chopper": "src/images/chopper.png",
            "Pochita": "src/images/pochita.png",
            "Winnie the Pooh": "src/images/pooh.png",
            "Hello Kitty": "src/images/hellokitty.png",
            "Teemo": "src/images/teemo.png",
            "Pikmin Trio": "src/images/pikmin.png",
            "Rock Pikmin": "src/images/rockpikmin.png",
            "Purple Pikmin": "src/images/purplepikmin.png",
            "Bob the Builder": "src/images/bobbuilder.png",
            "Blue's Clues": "src/images/blue.png",
            "Dora and Boots": "src/images/doraboots.png",
            "Baby Groot": "src/images/groot.png",
            "Bob the Minion": "src/images/bobminion.png",
            "Totoro": "src/images/totoro.png",
            "Katie": "src/images/katie.png",
            "Tutter": "src/images/tuttermouse.png",
            "Mike Wazowski": "src/images/mike.png",
            "Grimace": "src/images/grimace.png",
            "Elmo": "src/images/elmo.png",
            "Cookie Monster": "src/images/cookiemonster.png",
            "Bert and Ernie": "src/images/berternie.png",
            "Stewie": "src/images/stewie.png",
            "Peter": "src/images/peter.png",
            "Ted": "src/images/ted.png",
            "Jungkook": "src/images/jungkook.png",
            "Miga": "src/images/miga.png",
            "Quatchi": "src/images/quatchi.png",
            "Sumi": "src/images/sumi.png",
            "Mukmuk": "src/images/mukmuk.png",
            "Cinnamoroll": "src/images/cinnamoroll.png",
            "Kuromi": "src/images/kuromi.png",
            "Pompompurin": "src/images/pompompurin.png",
            "Gudetama": "src/images/gudetama.png",
            "Badtz-Maru": "src/images/badtz-maru.png",
            "Subway Surfers": "src/images/subway surfers.png",
            "Fire Boy and Water Girl": "src/images/fire boy and water girl.png",
            "Om Nom": "src/images/om nom.png",
            "Talking Tom": "src/images/talking tom.png",
            "Talking Ben": "src/images/talking ben.png",
            "Among Us": "src/images/Among_Us.png",
            "Fall Guy": "src/images/Fall_Guy.png",
            "Pablo": "src/images/Pablo_Backyardigans.png",
            "Toopy and Binoo": "src/images/Toopie_and_Binoo.png",
            "Pusheen": "src/images/pusheen.png",
            "Lightning McQueen": "src/images/lightning mcqueen.png",
            "Goku": "src/images/goku.png",
            "LeBron": "src/images/bron.png"
        };
    }

    roll(user) {
        const rollCost = 120;
        if (user.subtractNuggets(rollCost)) {
            console.log("rolled.");
            const keys = Object.keys(this.possibleNuggetmon);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const newNuggetmon = new Nuggetmon(randomKey, this.possibleNuggetmon[randomKey]);
            user.addNuggetmon(newNuggetmon);
        } else {
            console.log("Not enough nuggets to roll.");
        }
    }
}

export default NuggetMachine;