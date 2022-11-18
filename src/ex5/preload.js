const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('preloadAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    captureScreenshot: () => ipcRenderer.invoke('capture-screenshot'),
});

ipcRenderer.on('update-counter', (_event, value) => {
    const counter = document.querySelector('#counter');
    const oldVal = Number(counter.innerHTML);
    counter.innerHTML = oldVal + value; 
});