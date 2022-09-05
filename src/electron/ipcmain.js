const { ipcMain, globalShortcut, app, clipboard } = require("electron");
import { listMemo, createDatabase, addMemo, listText } from "./database.js";
let win = null;
const robot = require('robotjs')

function initIpcMain(w) {
  win = w;
}
ipcMain.on("asynchronous-message", (event, arg) => {
  event.reply("asynchronous-reply", app.getPath("exe"));
  // let db = createDatabase("database3.db");
  // addMemo(db, "토요일에 어디서 놀지 생각하기", "2020-02-13");
  // listMemo(db);
});
ipcMain.on("click-clipboard", (evnet, arg) => {
  clipboard.writeText(arg)
  robot.keyTap('v', process.platform === 'darwin' ? 'command' : 'control')

})
ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg); // "ping" 출력
  event.returnValue = "sync pong";
});
ipcMain.on("hide", (event, arg) => {
  win.setFocusable(true)
  win.setAlwaysOnTop(false)
  win.hide()
});
ipcMain.on("getdb", async (event, arg) => {
  event.reply('getdb', await listText(db))
})
export { ipcMain, initIpcMain };
