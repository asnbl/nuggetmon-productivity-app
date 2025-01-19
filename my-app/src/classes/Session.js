const { windowManager } = require('node-window-manager');
import Timer from './Timer';

const timeBeforeAnger = 5000 // 5 seconds for testing
const angerIncreaseInterval = 5000 // 5 seconds for testing
const reapInterval = 1000 // one minute

export class Session {
    timer;
    user;
    activeMon;
    productiveApps;
    reap;
    trackingInterval;
    angerInterval;
    angerTimeout;

    constructor(timer, user, activeMon) {
        this.timer = timer;
        this.user = user;
        this.activeMon = activeMon;
        this.productiveApps = [];
        this.reap = 0;
        this.trackingInterval = null;
        this.angerInterval = null;
        this.angerTimeout = null;
    }

    setProductiveApps(apps) {
        this.productiveApps = apps;
    }

    startSession() {
        this.timer.start();
        this.trackWindows();
    }

    endSession() {
        this.timer.pause();
        clearInterval(this.trackingInterval);
        clearInterval(this.angerInterval);
        clearTimeout(this.angerTimeout);
        console.log('Session ended');
    }

    trackWindows() {
        this.trackingInterval = setInterval(async () => {
            let newWindow = windowManager.getActiveWindow();

            if (this.productiveApps.some(app => app == newWindow.id)) {
                // console.log("Here....");
                this.incrementReap();
                clearTimeout(this.angerTimeout);
                clearInterval(this.angerInterval);
                this.angerInterval = null;
                this.angerTimeout = null;
            } else {
                // console.log(`current window: ${newWindow.id}, should be one of: ${this.productiveApps}`);
                if (!this.angerTimeout) {
                    this.angerTimeout = setTimeout(() => {
                        this.startAngerInterval();
                    }, timeBeforeAnger);
                }
            }
        }, 1000);
    }

    incrementReap() {
        if (!this.reapIntervalId) {
            this.reapIntervalId = setInterval(() => {
                let currentWindow = windowManager.getActiveWindow();
                if (this.productiveApps.some(app => app == currentWindow.id)) {
                    this.reap++;
                    console.log(`Reap incremented to: ${this.reap}`);
                } else {
                    clearInterval(this.reapIntervalId);
                    this.reapIntervalId = null;
                }
            }, reapInterval);
        }
    }

    startAngerInterval() {
        if (!this.angerInterval) {
            this.angerInterval = setInterval(() => {
                let currentWindow = windowManager.getActiveWindow();
                if (this.productiveApps.some(app => app == currentWindow.id)) {
                    console.log("Time to reset the anger interval!");
                    clearInterval(this.angerInterval);
                    this.angerInterval = null;
                } else {
                    this.activeMon.increaseAnger();
                    console.log(`Anger level increased to: ${this.activeMon.angerLevel}`);
                }
            }, angerIncreaseInterval);
        }
    }
}