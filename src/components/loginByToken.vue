<template v-loading.fullscreen.lock="fullscreenLoading">

</template>

<script>
    export default {
        name: "loginByToken",
        data(){
            return{
                token: this.$route.query.token,
                fullscreenLoading: true,
                loading:''
            }
        },
        methods: {
            getMenu(){
                //获取用户菜单
                let self = this;
                let url = "/api/auth/queryResource";
                self.$axios.post(url).then(function (response) {
                    sessionStorage.setItem('menus',JSON.stringify(response.data));
                    self.loading.close();
                    self.$router.push('/amfHomeHtml');
                })
            },
            openFullScreen() {
                this.loading = this.$loading({
                    lock: true,
                    text: '跳转水环境监测系统中......',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            },
            initPage(){
                // console.log(this.token)
                this.openFullScreen();
                sessionStorage.setItem('token', this.token);
                this.loading.close();
                // this.getMenu();
                this.$router.push('/amfHomeHtml');
            }
        },
        created() {
            this.initPage();
        }

    }
</script>

<style scoped>

</style>
