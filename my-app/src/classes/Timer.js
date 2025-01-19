import {Nuggetmon} from "./Nuggetmon";

class Timer {
    constructor(initialTime) {
        this.initialTime = initialTime;
        this.timeLeft = initialTime;
        this.isRunning = false;
        this.interval = null;
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.interval = setInterval(() => {
            this.timeLeft -= 1;
            console.log(`Time left: ${this.timeLeft}s`);

            if (this.timeLeft <= 0) {
                this.pause();
                console.log('Timer completed');
            }
        }, 1000);
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
        }
    }

    restart() {
        this.pause();
        this.timeLeft = this.initialTime;
        this.start();
    }
}

export default Timer;