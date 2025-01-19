import {Nuggetmon} from "./Nuggetmon";

class NuggetMachine {
    constructor() {
        this.nuggetmonPool = [
            { name: "Sparkle", rarity: "Common" },
            { name: "Glimmer", rarity: "Uncommon" },
            { name: "Radiance", rarity: "Rare" },
            { name: "Luminous", rarity: "Epic" },
            { name: "Celestial", rarity: "Legendary" }
        ];
    }
    rollNuggetmon(nuggets) {
        const rollCost = 100;
        if (nuggets.subtract(rollCost)) {
            const randomIndex = Math.floor(Math.random() * this.nuggetmonPool.length);
            const { name, rarity } = this.nuggetmonPool[randomIndex];
            return new Nuggetmon(name, rarity);
        }
        return null;
    }
}