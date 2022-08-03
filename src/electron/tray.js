import { Menu, Tray } from "electron";
let tray = null;
function initTrayIconMenu(w, app, location) {
  tray = new Tray(location);
  const myMenu = Menu.buildFromTemplate([
    {
      label: "1번",
      type: "normal",
      checked: true,
      click: () => {
        console.log("1번클릭!");
        w.show();
      },
    }, //checked는 기본선택입니다.
    {
      label: "종료",
      type: "normal",
      click: () => {
        console.log("2번클릭!");
        app.quit();
      },
    },
  ]);
  tray.setToolTip("cva");
  tray.setContextMenu(myMenu);
  tray.on("double-click", () => {
    console.log("double click!!");
    w.show();
  });
}

export default initTrayIconMenu;
