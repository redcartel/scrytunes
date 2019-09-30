// adapted from wwlib/cra-craco-electron-example

const electron = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: { nodeIntegration: true }});

  // if isDev load devserver and add React devtools
  if (isDev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
    mainWindow.loadURL('http://localhost:3000');
    
    installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
      console.log(`Added extension ${name}`)
    }).catch((err)=> {
      console.log(`installExtension error ${err}`)
    })
    mainWindow.webContents.openDevTools();

  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

    // Emitted when the window is closed.
    mainWindow.setResizable(true)
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
