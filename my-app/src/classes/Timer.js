import {Nuggetmon} from "./Nuggetmon";

class ProductivityTracker {
    constructor(user) {
        this.user = user;
        this.timer = null;
        this.startTime = null;
        this.endTime = null;
        this.potentialNuggets = 0;
    }
    startSession(duration) {
        this.startTime = new Date();
        this.endTime = new Date(this.startTime.getTime() + duration * 60000);
        this.potentialNuggets = Math.floor(duration / 5);
        this.timer = setInterval(() => {
            this.checkProductivity();
        }, 60000); // Check every minute
    }
    checkProductivity() {
        // Implement logic to check active applications
        // and determine if the user is being productive
        const isProductive = this.isUserProductive();
        if (isProductive) {
            this.user.nuggetmon.forEach(nuggetmon => nuggetmon.decreaseAnger(5));
        } else {
            this.user.nuggetmon.forEach(nuggetmon => nuggetmon.increaseAnger(10));
            this.potentialNuggets = Math.max(0, this.potentialNuggets - 1);
        }
        if (new Date() >= this.endTime) {
            this.endSession();
        }
    }
    isUserProductive() {
        // Implement logic to check active applications
        // and determine if the user is being productive
        // Return true if productive, false otherwise
    }
    endSession() {
        clearInterval(this.timer);
        this.user.addNuggets(this.potentialNuggets);
        // Handle any angry Nuggetmon
        this.user.nuggetmon = this.user.nuggetmon.filter(nuggetmon => !nuggetmon.isAngry());
    }
}