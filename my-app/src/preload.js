const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    refreshWindows: () => ipcRenderer.send('refresh-windows'),
    onOpenWindows: (callback) => ipcRenderer.on('open-windows', (event, windows) => callback(windows)),
    startSession: (selectedWindows, pomodoroTimer) => ipcRenderer.send('start-session', { selectedWindows, pomodoroTimer }),
    onUpdateNuggetCount: (callback) => ipcRenderer.on('update-nugget-count', (event, value) => callback(value)),
});