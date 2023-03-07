import path from "path";
import { BrowserWindow, app } from "electron";

const dist = path.join(__dirname, "../dist");
// process.env.PUBLIC = app.isPackaged ? dist : path.join(dist, "../public");

const preload = path.join(__dirname, "./preload.js");
const url = process.env.VITE_DEV_SERVER_URL;

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (url) {
    void win.loadURL(url);
  } else {
    void win.loadFile(path.join(dist, "index.html"));
  }

  win.show();
});
