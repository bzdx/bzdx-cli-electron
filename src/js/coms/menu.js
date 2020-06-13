let menuComponent = {
    props: ['ipcRenderer'],
    data() {
        return {
            menuList: [
                {
                    title: "文件共享",
                    items: [
                        {
                            title: "点对点共享",
                            link: "#/share/point"
                        },
                        {
                            title: "全局共享",
                            link: "#/share/global"
                        },
                        {
                            title: "云共享",
                            link: "#/share/cloud"
                        },
                        {
                            title: "传输列表",
                            link: "#/share/trans-list"
                        },
                    ],
                },
                {
                    title: "网络管理",
                    items: [
                        {
                            title: "查看连接",
                            link: "#/net/show"
                        },
                        {
                            title: "外网穿透",
                            link: "#/net/nat"
                        },
                        {
                            title: "其他",
                            link: ""
                        },
                    ],
                },
                {
                    title: "云存储",
                    link: "/storage",
                },
                {
                    title: "管理员",
                    items: [
                        {
                            title: "用户管理",
                            link: "#/admin/user"
                        },
                        {
                            title: "授权管理",
                            link: "#/admin/auth"
                        },
                        {
                            title: "管理员设置",
                            link: "#/admin/setting"
                        },
                    ],
                },
                {
                    title: "其他",
                    link: "",
                },
            ],
            full_icon: "el-icon-full-screen",
            fullScreen: false, // 默认非全屏
        }
    },
    methods: {
        /**
         * 点击全屏切换
         * @req fullScreen{bool}
         */
        fullScreenToggle() {
            this.fullScreen = !this.fullScreen;
            this.full_icon = this.full_icon === "el-icon-full-screen" ? "el-icon-copy-document" : "el-icon-full-screen";
            this.ipcRenderer.send('full-screen', this.fullScreen);
        },
        /**
         * 点击最小化切换
         */
        miniScreen() {
            this.ipcRenderer.send('mini-screen', true);
        },
        /**
         * 点击关闭程序
         */
        closeAPP() {
            this.$confirm('确定退出吗?', '关闭提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'danger',
                    message: '正在退出!'
                });
                this.ipcRenderer.send('close-app', true);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        /**
         * 切换路由
         */
        goTo(path) {
            location.href = path;
        }
    },
    template: `<el-menu default-active="'0'" class="page-menu" mode="horizontal">
        <div class="menu-icon menu-icon-miniscreen" @click="miniScreen()" title="最小化"><div class="el-icon-minus"></div></div>
        <div class="menu-icon menu-icon-fullscreen" @click="fullScreenToggle()" title="最大化"><div :class="full_icon"></div></div>
        <div class="menu-icon menu-icon-close" @click="closeAPP()" title="关闭"><div class="el-icon-close"></div></div>
    </el-menu>`,
    mounted() {
        let _this = this;
        let menu = document.querySelector('.page-menu');
        let click = {x: 0, y: 0, down: false};
        menu.onmousedown = function (ev) {
            click = {
                x: ev.pageX,
                y: ev.pageY,
                down: true,
            };
        };
        menu.onmouseup = function(ev) {
            click.down = false;
        };
        menu.onmousemove = function(ev) {
            if (click.down) {
                // console.log(ev.pageX - click.x, ev.pageY - click.y)
                _this.ipcRenderer.send('move-screen', {x: ev.pageX - click.x, y: ev.pageY - click.y});
            }
        }
    }
};
