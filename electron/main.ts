import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  // If `ELECTRON_START_URL` is set, load that (useful for development with HMR).
  // Otherwise load the built app from `build/index.html` (created by `npm run build`).
  const startUrl = process.env.ELECTRON_START_URL;
  if (startUrl) {
    win.loadURL(startUrl).then(() => {
      // Open devtools automatically for development troubleshooting
      try {
        win.webContents.openDevTools({ mode: 'detach' });
      } catch (e) {
        // ignore
      }
    }).catch(err => {
      console.error('Failed to load start URL', startUrl, err);
    });
    } else {
    // Prefer the production build output, but fall back to `public/index.html`
    const buildIndex = path.join(__dirname, '../build/index.html');
    const publicIndex = path.join(__dirname, '../public/index.html');
    try {
      if (fs.existsSync(buildIndex)) {
        win.loadFile(buildIndex).catch(err => {
          console.error('Failed to load index.html from build:', err);
        });
      } else if (fs.existsSync(publicIndex)) {
        console.warn('build/index.html not found — falling back to public/index.html');
        win.loadFile(publicIndex).catch(err => {
          console.error('Failed to load public/index.html:', err);
        });
      } else {
        const msg = `Missing both ${buildIndex} and ${publicIndex}. Run \"npm run build\" or use \"npm run dev\" for development.`;
        console.error(msg);
        try {
          dialog.showErrorBox('Missing app files', msg);
        } catch (e) {
          // ignore dialog errors
        }
      }
    } catch (e) {
      console.error('Failed to check for build/public index files:', e);
    }
  }
}

app.whenReady().then(createWindow).catch(err => {
  console.error('Error while creating window:', err);
  app.quit();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// F8: Auth/Permissions, F7: Productive Breaks (Native Alarms) placeholder
ipcMain.on('auth', (event, args) => {
  // TODO: implement authentication
});
