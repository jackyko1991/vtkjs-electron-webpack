const electron = require('electron');
const {app,BrowserWindow} = electron;
let mainWindow = electron;
app.on('ready',()=>{
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});