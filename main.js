const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
} = require('electron')
const path = require('path')

const current_ex = process.argv[2] || 1;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, `./src/ex${current_ex}/preload.js`)
    }
  });

  const menu = Menu.buildFromTemplate([{
    label: 'The Menu',
    submenu: [{
      click: () => win.webContents.send('update-counter', 1),
      label: 'Increment',
    }, {
      click: () => win.webContents.send('update-counter', -1),
      label: 'Decrement',
    }, {
      click: () => win.webContents.openDevTools(),
      label: 'Debug',
    }]
  }])
  Menu.setApplicationMenu(menu)

  win.loadFile(`./src/ex${current_ex}/index.html`);
  // win.loadURL('https://dbdiagram.io');
  return win;
}

app.whenReady().then(() => {
  const win = createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
