export class User {
    username;
    nuggets;
    collectedMons;
    failedMons;
    totalEarned;
    currentPartner;

    constructor(username) {
        this.username = username;
        this.nuggets = 0;
        this.collectedMons = 0;
        this.failedmons = 0;
        this.totalEarned = 0;
        this.currentPartner = null;
    }

    earnNuggets(toEarn) {
        this.nuggets += toEarn;
        this.totalEarned += toEarn;
    }

    spendNuggets(toSpend) {
        this.nuggets -= toSpend;
    }

    failMon() {
        this.failedMons++;
    }

    setActiveMon(toSet) {
        this.currentPartner = toSet;
    }
}