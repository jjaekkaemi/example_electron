// renderer 프로세스(웹 페이지)안에서
const { ipcRenderer } = require("electron");
// console.log(ipcRenderer.sendSync("asynchronous-message", "ping")); // "pong"이 출력됩니다.
// ipcRenderer.send("asynchronous-message", "ping");
ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(arg); // "pong"이 출력됩니다.
});
// ipcRenderer.send("asynchronous-message", "ping");
function send() {
  ipcRenderer.send("asynchronous-message", "ping");
}
export { ipcRenderer, send };
