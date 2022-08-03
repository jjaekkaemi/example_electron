import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
const { ipcMain } = require("./electron/ipcmain");

import initTrayIconMenu from "./electron/tray";
// main 프로세스안에서
import { clipboardinit } from "./electron/clipboard";
import { createDatabase } from "./electron/database.js";

const path = require("path");
let win = null;
const Store = require("electron-store");
const store = new Store();
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
    // win.on("close", (event) => {
    //   if (app.quitting) console.log("quitting");
    //   else {
    //     event.preventDefault();
    //     win.hide();
    //   }
    // });

    // let db = createDatabase("database.db");
    // await clipboardinit(win, db);
    // initTrayIconMenu(win, app, path.join(__dirname, "../src/assets/logo.png"));
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    // let db = createDatabase(
    //   app.getPath("exe").replace("example2.exe", "database.db")
    // );
    win.on("close", (event) => {
      if (app.quitting) console.log("quitting");
      else {
        event.preventDefault();
        win.hide();
      }
    });
    let db = createDatabase(
      path.join(app.getPath("userData"), "./database.db")
    );
    await clipboardinit(win, db);
    const iconPath = path.join(__dirname, "logo.ico");

    initTrayIconMenu(win, app, iconPath);
  }
}

app.setLoginItemSettings({
  openAtLogin: true,
});
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});
app.on("before-quit", () => (app.quitting = true));
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
