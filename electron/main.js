const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 390,
    height: 844,
    minWidth: 320,
    minHeight: 568,
    backgroundColor: '#0f0f0f',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'public/icon.png'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1a1a1a',
      symbolColor: '#f5f5f5',
      height: 44
    }
  });

  if (process.env.NODE_ENV === 'development' || process.argv.includes('--dev')) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

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
