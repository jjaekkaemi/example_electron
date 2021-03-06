const clipboard = require("./index");
const { globalShortcut } = require("electron");
import { listText, addText } from "./database.js";

const Store = require("electron-store");
const store = new Store();
let win = null
let db = null
clipboard
  .on("text-changed", () => {
    let currentText = clipboard.readText().replace(/\'/g, "''");
    addText(db, currentText, new Date())
    console.log(currentText);
  })
  .once("text-changed", () => {
    console.log("TRIGGERED ONLY ONCE");
  })
  .on("image-changed", () => {
    let currentIMage = clipboard.readImage();
    console.log(currentIMage);
  })
  .startWatching();


function clipboardinit(w, d) {
  win = w;
  db = d;
  let clipboardopen = store.get("clipboardopen")
  if (clipboardopen) {
    globalShortcut.register(store.get("clipboardopen"), clipboardCallback);
  }
  else {
    store.set("clipboardopen", "Shift+V")
  }

}
function clipboardCallback() {
  win.webContents.send('asynchronous-reply', '클립보드화면!')
  listText(db)
}
function clipboardUpdate(shortcut, newshortcut) {
  console.log("unregister!!!")
  globalShortcut.unregister(shortcut, () => {
    try {
      console.log(shortcut);
    } catch (error) {
      console.log(error);
    }
  });
  globalShortcut.register(newshortcut, clipboardCallback);
  store.set("clipboardopen", newshortcut)

}
export { clipboard, clipboardUpdate, clipboardinit };
