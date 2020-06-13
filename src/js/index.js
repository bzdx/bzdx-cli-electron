let electron = require("electron");
let {ipcRenderer} = electron;
new Vue({
    el: "#page",
    data: {
        ipcRenderer,
    },
    template: `<div id="page">
        <!-- ------------------------------ 菜单 ------------------------------ -->
        <page-menu :ipcRenderer="ipcRenderer"></page-menu>
    </div>`,
    mounted() {
        console.log(ipcRenderer)
    },
    components: {
        'page-menu': menuComponent
    }
});
