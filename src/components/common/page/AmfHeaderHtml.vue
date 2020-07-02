<template>
  <!-- 头部 -->
  <div class="header">
    <h1 class="logo"><i></i>
        <span style="font-size: 22px">{{this.AppConfig.appInfo.title}}</span>
    </h1>
    <div class="header-right">
      <div class="header-system">
        <div class="system-hd"><i class="icon icon-xitong system-icon"></i><span class="system-name">系统切换</span><i class="icon icon-caret-down system-arw"></i></div>
        <div class="system-bd">
          <div class="system-arrow"></div>
          <ul class="system-list">
            <li v-on:click="jumpAirMonitorFront"><a href="#"><i class="icon icon-arw"></i>空气监测系统</a></li>
            <!--<li><a href="#"><i class="icon icon-arw"></i>系统系统二</a></li>-->
            <!--<li><a href="#"><i class="icon icon-arw"></i>空气质量精细化管控平台</a></li>-->
            <!--<li><a href="#"><i class="icon icon-arw"></i>系统系统四</a></li>-->
          </ul>
        </div>
      </div>
      <div class="header-user">
        <div class="user-avatar"><img src="../../../../static/css/images/pic/avatar.png" alt=""></div>
        <div class="user-name">管理员</div>
        <div class="user-text" @click="logout"><a href="#">注销</a></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AmfHeaderHtml",
        methods: {
            logout(){
                // const self = this;
                // self.$axios.post("/operation/user/sys/logout").then(function (response) {
                // }).catch(function (err) {
                //     console.log(err);
                //     self.message = "连接服务器失败！"
                // });
                sessionStorage.removeItem("token")
                this.$router.push('/');
            },
            jumpAirMonitorFront(){
                // window.open(this.AppConfig.appInfo.airMonitorFront+sessionStorage.getItem('token'), '_self');
            }
        }
    }
</script>

<style scoped>

</style>
