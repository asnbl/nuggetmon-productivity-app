import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

let mainWindow;
let popupWindow;

const {windowManager} = require('node-window-manager')

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const trackWindows = () => {
  setInterval(async () => {
    let newWindow = windowManager.getActiveWindow();
    console.log(newWindow);
  }, 1000);
}

const getOpenWindows = () => {
  const windows = windowManager.getWindows();

  // Filter to include only visible windows
  const visibleWindows = windows.filter(window => window.isVisible());

  // // Optionally filter further based on other properties
  // const userFacingWindows = visibleWindows.filter(window => {
  //   // You can add more conditions here to exclude windows that shouldn't be considered
  //   return window.title && window.title.trim() !== ''; // Ensure the window has a title
  // });
  return visibleWindows;
  // console.log('Open Windows:', visibleWindows);
};

app.whenReady().then(() => {
  createWindow();

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
