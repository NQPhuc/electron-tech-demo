const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('preloadAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
});