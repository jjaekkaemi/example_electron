const clipboard = require("./index");
const { globalShortcut } = require("electron");
import { listText, addText } from "./database.js";
let win = null
let db = null
clipboard
  .on("text-changed", () => {
    let currentText = clipboard.readText();
    addText(db, 1, currentText, new Date())
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


function init(w, d) {
  win = w;
  db = d;
}
function registerCallback() {
  win.webContents.send('asynchronous-reply', '클립보드화면!')
  listText(db)
}
function clipboardUpdate(shortcut, newshortcut) {
  globalShortcut.unregister(shortcut, () => {
    try {
      console.log("CommandOrControl+X is unregister");
    } catch (error) {
      console.log(error);
    }
  });
  globalShortcut.register(newshortcut, () => {
    try {
      console.log("new!");
    } catch (error) {
      console.log(error);
    }
  });
}
export { clipboard, clipboardUpdate, registerCallback, init };
