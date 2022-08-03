const { ipcMain, globalShortcut, app } = require("electron");
import { listMemo, createDatabase, addMemo } from "./database.js";

ipcMain.on("asynchronous-message", (event, arg) => {
  event.reply("asynchronous-reply", app.getPath("exe"));
  // let db = createDatabase("database3.db");
  // addMemo(db, "토요일에 어디서 놀지 생각하기", "2020-02-13");
  // listMemo(db);
});

ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg); // "ping" 출력
  event.returnValue = "sync pong";
});

export { ipcMain };
