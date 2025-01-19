import { Nuggetmon } from "./Nuggetmon";

class User {
    constructor(name) {
        this.name = name;
        this.currentNuggetmon = [];
        this.nuggetdex = {};
        this.nuggets = 0;
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

    getNuggets() {
        return this.nuggets;
    }
}

export default User;