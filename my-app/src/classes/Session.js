const {windowManager} = require('node-window-manager');
import Timer from './Timer';

const timeBeforeAnger = 60000 // one minute
const angerIncreaseInterval = 30000 // 30 seconds
const reapInterval = 60000 // one minute

export class Session {
    timer;
    user;
    activeMon;
    productiveApps;
    reap;

    constructor(timer, user, activeMon) {
        this.timer = timer;
        this.user = user;
        this.activeMon = activeMon;
        this.productiveApps = [];
        this.reap = 0;
    }

    setProductiveApps(apps) {
        this.productiveApps = apps;
    }

    trackWindows() {
        setInterval(async () => {
            let newWindow = windowManager.getActiveWindow();

            if (this.productiveApps.some(app => app.id === newWindow.id)) {
                this.incrementReap();
            } else {
                setTimeout(() => {
                    let stillActiveWindow = windowManager.getActiveWindow();
                    if (stillActiveWindow.id === newWindow.id && !this.productiveApps.some(app => app.id === stillActiveWindow.id)) {
                        this.increaseAngerLevel();
                    }
                }, timeBeforeAnger);
            }
        }, 1000);
    }

    incrementReap() {
        setInterval(() => {
            let currentWindow = windowManager.getActiveWindow();
            if (this.productiveApps.some(app => app.id === currentWindow.id)) {
                this.reap++;
                console.log(`Reap incremented to: ${this.reap}`);
            }
        }, reapInterval);
    }

    increaseAngerLevel() {
        const angerInterval = setInterval(() => {
            let currentWindow = windowManager.getActiveWindow();
            if (this.productiveApps.some(app => app.id === currentWindow.id)) {
                clearInterval(angerInterval);
            } else {
                this.activeMon.increaseAnger();
                console.log(`Anger level increased to: ${this.activeMon.angerLevel}`);
            }
        }, angerIncreaseInterval);
    }
}