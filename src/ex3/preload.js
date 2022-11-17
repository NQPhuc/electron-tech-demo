const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('update-counter', (_event, value) => {
    const counter = document.querySelector('#counter');
    const oldVal = Number(counter.innerHTML);
    counter.innerHTML = oldVal + value; 
  });
});