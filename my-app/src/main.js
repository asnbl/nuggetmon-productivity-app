import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

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
  const visibleWindows = windows.filter(window => window.isVisible());

  const windowTitles = visibleWindows.map((window) => {return window.getTitle()});

  return windowTitles.filter(window => window !== '');
  // console.log('Open Windows:', visibleWindows);
};



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
