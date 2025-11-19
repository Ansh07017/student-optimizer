import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadFile(path.join(__dirname, '../src/index.html'));
}

app.whenReady().then(createWindow);

// F8: Auth/Permissions, F7: Productive Breaks (Native Alarms) placeholder
ipcMain.on('auth', (event, args) => {
  // TODO: implement authentication
});
