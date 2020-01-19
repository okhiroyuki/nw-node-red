const pkg = require('./package.json');
if (pkg.hasOwnProperty("NRnwjs")) {
    options = pkg["NRnwjs"]
}

let menu = new nw.Menu({
    type: 'menubar'
});
if (process.platform === 'darwin') {
    const appName = pkg["name"];
    menu.createMacBuiltin(appName, {
        hideEdit: true,
        hideWindow: false
    });
}

const template = [{
    label: "Help",
    submenu: [
        {
            label: 'Documentation',
            click: function () {
                nw.Shell.openExternal('https://nodered.org/docs')
            }
        },
        {
            label: 'Flows and Nodes',
            click: function () {
                nw.Shell.openExternal('https://flows.nodered.org')
            }
        },
        {
            label: 'Discourse Forum',
            click: function () {
                nw.Shell.openExternal('https://discourse.nodered.org/')
            }
        }
    ]
}];

var submenu = new nw.Menu();
for (const sm of template[0].submenu) {
    console.log(sm);
    submenu.append(new nw.MenuItem(sm));
}

menu.append(new nw.MenuItem({
    label: template[0].label,
    submenu: submenu
}));
var win = nw.Window.get();
win.menu = menu;
win.setPosition("center");
win.maximize();