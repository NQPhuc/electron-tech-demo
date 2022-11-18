const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  desktopCapturer,
} = require('electron')
const path = require('path')

const current_ex = process.argv[2] || 5;

async function handleCapture (event) {
  const promise = new Promise((resolve, reject) => {
    desktopCapturer.getSources({ types: ['screen'] }).then(sources => {
      if (sources.length < 1) reject('Something is wrong');
      return resolve(sources[0].thumbnail.toDataURL())
    });
  });
  try {
    const screenshot = await promise;
    return screenshot;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function handleSetTitle (event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

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
  Menu.setApplicationMenu(menu);

  win.loadFile(`./src/ex${current_ex}/index.html`);
  // win.loadURL('https://dbdiagram.io');
  return win;
}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.handle('capture-screenshot', handleCapture);
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
