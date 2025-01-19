import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { Session } from './classes/Session';
import { User } from './classes/User';
import { Nuggetmon } from './classes/Nuggetmon';
import Timer from "./classes/Timer";

if (started) {
  app.quit();
}


let productiveWindows = []

let mainWindow;
let popupWindow;

const {windowManager} = require('node-window-manager') // comment when run

const createPopupWindow = () => {
  popupWindow = new BrowserWindow({
    width: 300,
    height: 200,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  popupWindow.loadFile('src/popup.html');

  popupWindow.once('ready-to-show', () => {
    popupWindow.show();
    popupWindow.setAlwaysOnTop(true, 'screen-saver');
  });

  popupWindow.on('blur', () => {
    popupWindow.focus();
  });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  //   mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  // } else {
  //   mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/nuggetmon.html`));
  // }

  mainWindow.loadFile("nuggetmon.html");

  // Open the DevTools.
//   mainWindow.webContents.openDevTools();

  setTimeout(createPopupWindow, 1000);
  mainWindow.on('closed', () => {
    if (popupWindow && !popupWindow.isDestroyed()) {
      popupWindow.close();
    }
  });
};


// comment when run
const trackWindows = () => {
  setInterval(async () => {
    let newWindow = windowManager.getActiveWindow();

    // Check if the window is already in productiveWindows by comparing IDs
    if (
        newWindow &&
        !productiveWindows.some(win => win.id === newWindow.id) &&
        productiveWindows.length < 3
    ) {
      productiveWindows.push(newWindow);
      console.log("Added to productive windows:", newWindow);
    }

    if (
        newWindow &&
        !productiveWindows.some(win => win.id === newWindow.id)
    ) {
      console.log("That's not productive!");
    }
  }, 1000);
};

// comment when run
const getOpenWindows = () => {
  const windows = windowManager.getWindows();

  // Filter to include only visible windows
  const visibleWindows = windows.filter(window => window.isVisible() && window.getTitle() !== '');

  // Map to include window data and titles
  const windowsWithTitles = visibleWindows.map(window => ({
    id: window.id,
    title: window.getTitle()
  }));

  return windowsWithTitles;
};

ipcMain.on('refresh-windows', (event) => {
  const openWindows = getOpenWindows();
  event.sender.send('open-windows', openWindows);
});

ipcMain.on('start-session', (event, { selectedWindows, pomodoroTimer }) => {
  const openWindows = getOpenWindows();
  // const selectedWindowData = openWindows.filter(window => selectedWindows.includes(window.id));

  const user = new User('genericUser');
  const nuggetmon = new Nuggetmon('genericName', 'genericNickname', 1, 0, 10, 'genericPhoto');
  const session = new Session(new Timer(pomodoroTimer * 60), user, nuggetmon);

  session.setProductiveApps(selectedWindows);
  session.startSession();
  console.log('Session started with productive apps:', selectedWindows);
});

app.whenReady().then(() => {
  createWindow();

  // comment when run
  const windows = getOpenWindows();
  console.log(windows);
  console.log(windows.length);

  // trackWindows();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});