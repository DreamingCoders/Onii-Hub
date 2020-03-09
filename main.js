// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const EventEmitter = require('events');

function createWindow (type) {
  // Create the browser window.
  if(type === 'main'){
  global.mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  }else if(type === 'about'){
	const aboutWindow = new BrowserWindow({
  width: 480,
  height: 300,
	modal: true,
	parent: mainWindow
  })

  aboutWindow.loadFile('about.html')
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

//app.on('ready', createWindow)

//const { app, Menu, Tray } = require('electron')

let tray = null
//app.on('ready', createWindow, () => {
  app.on('ready', () => {

  createWindow('main')
  //tray = new Tray('/storage/img/test.png')
 //const trayDir = Tray(app.getAppPath() + '/storage/img/test.png')
 //const trayDir = Tray(app.getAppPath());
 //tray = new Tray('C:/Users/Colin/Desktop/Onii Application/electron-quick-start/storage/img/test.png')
 //tray = new Tray(trayDir + '/storage/img/test.png')

 tray = new Tray(`${app.getAppPath()}/storage/img/test.png`)

 const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'About', click() { createWindow('about') } },
    { label: 'Exit', click() { app.quit() } }
    ])
  tray.setToolTip('Onii Hub v0.0.1')
  tray.setContextMenu(contextMenu)
  tray.setIgnoreDoubleClickEvents(true)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
