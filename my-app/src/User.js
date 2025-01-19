export class User {
    username;
    nuggets;
    collectedMons;
    failedMons;
    totalEarned;

    constructor(username) {
        this.username = username;
        this.nuggets = 0;
        this.collectedMons = 0;
        this.failedmons = 0;
        this.totalEarned = 0;
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
}