<template>
  <!-- 内容区 -->
  <div class="content">
首页
  </div>
</template>

<script>
    export default {
        name: "homeHtml",
        methods: {
            init(){

                let params = {
                    vv: Math.random()
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/device/r/getStat",params).then(function (data) {

                    console.log("======登录后请求======");
                    console.log(data);
                }).catch(function (err) {
                    console.log("======登录后请求==报错====");
                    console.log(err);
                })
            }
        },
        created() {
            this.init();
        }
    }

</script>

<style scoped>

</style>
