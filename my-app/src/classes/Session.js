const { windowManager } = require('node-window-manager');
import Timer from './Timer';
const { ipcMain } = require('electron');

const timeBeforeAnger = 1000 // 5 seconds for testing
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

    startSession() {
        this.timer.start();
        this.trackWindows();
    }

    endSession() {
        this.timer.pause();
        this.clearAllIntervals();
        this.user.addNuggets(this.reap);
        console.log(`Session ended, nuggets: ${this.user.getNuggets()}`);

        // Emit the updated nugget count to the main process
        ipcMain.emit('update-nugget-count', this.user.getNuggets());
    }

    clearAllIntervals() {
        clearInterval(this.trackingInterval);
        clearInterval(this.angerInterval);
        clearInterval(this.reapIntervalId);
        clearTimeout(this.angerTimeout);
        this.trackingInterval = null;
        this.angerInterval = null;
        this.reapIntervalId = null;
        this.angerTimeout = null;
    }

    setProductiveApps(apps) {
        this.productiveApps = apps;
    }

    trackWindows() {
        if (this.timer.isRunning) {
            this.trackingInterval = setInterval(async () => {
                let newWindow = windowManager.getActiveWindow();

                if (this.productiveApps.some(app => app == newWindow.id)) {
                    this.incrementReap();
                    clearTimeout(this.angerTimeout);
                    clearInterval(this.angerInterval);
                    this.angerInterval = null;
                    this.angerTimeout = null;
                } else {
                    if (!this.angerTimeout) {
                        this.angerTimeout = setTimeout(() => {
                            this.startAngerInterval();
                        }, timeBeforeAnger);
                    }
                }
            }, 1000);
        }
    }

    incrementReap() {
        if (this.timer.isRunning) {
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
    }

    startAngerInterval() {
        if (this.timer.isRunning) {
            if (!this.angerInterval) {
                this.angerInterval = setInterval(() => {
                    let currentWindow = windowManager.getActiveWindow();
                    if (this.productiveApps.some(app => app == currentWindow.id)) {
                        clearInterval(this.angerInterval);
                        this.angerInterval = null;
                    } else {
                        this.activeMon.increaseAnger();
                        console.log(`Anger level increased to: ${this.activeMon.angerLevel}`);

                        // Emit IPC message to show popup
                        ipcMain.emit('show-popup');

                        if (this.activeMon.getAngerPercentage() >= 1) {
                            this.user.removeNuggetmon(this.activeMon);
                            console.log("Partner left...");
                        }
                    }
                }, angerIncreaseInterval);
            }
        }
    }
}