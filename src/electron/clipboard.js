const clipboard = require("./index");
const { globalShortcut } = require("electron");

clipboard
  .on("text-changed", () => {
    let currentText = clipboard.readText();
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
function clipboardOpen() {
  return globalShortcut.register("Shift+V", registerCallback);
}
function registerCallback() {
  console.log("흠냐리..?");
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
export { clipboard, clipboardUpdate, registerCallback };
