const electron = require("electron");
const client= require("electron-connect").client;


let {app, BrowserWindow, ipcMain} = electron;

app.on("ready", ()=>{
    // 界面设置
    // 尺寸
    let win = new BrowserWindow({
        width: 1000,
        height: 600,
        frame: false, // 隐藏菜单栏
        fullscreen: false,
        backgroundColor: '#2e2c29',
        webPreferences:{
            nodeIntegration:true
        }
    });
    // 打开开发者工具
    win.webContents.openDevTools();

    win.loadFile("./src/views/index.html");

    win.on('close', ()=> win = null );

    client.create(win);

    // ==================== 前后端进程通信 ====================
    win.webContents.on('did-finish-load', function() {
        // -------------------- 设置屏幕大小 --------------------
        // 全屏切换
        ipcMain.on('full-screen', (event, full)=>{
            win.setFullScreen(full);
        });
        // 最小化
        ipcMain.on('mini-screen', (event, isMini)=>{
            win.minimize();
        });
        // 移动屏幕
        ipcMain.on('move-screen', (event, pos)=>{
            let curX = win.getPosition()[0], curY = win.getPosition()[1]
            win.setPosition(curX+pos.x, curY+pos.y)
        });
        // 关闭退出
        ipcMain.on('close-app', (event, close)=>{
            app.quit()
        });
    });
});
