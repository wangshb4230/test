<template>
    <div class="login-page">
        <div class="login-side">
            <div class="login-side-bd">
                <img src="../../static/css/images/logo2.png" alt="">
                <h1>中节能智慧环境平台</h1>
                <p>欢迎来到中节能智慧环境平台</p>
            </div>
        </div>
        <div class="login-main">
            <div class="login-main-bd">
                <div class="login-tit">用户登录</div>
                <div class="login-item">
                    <label class="login-label" for="username">账号：</label>
                    <input v-model="ruleForm.username" type="text" class="login-input" placeholder="请输入您的账号" id="username">
                    <div v-if="userNameMessage" class="login-tips" style="display: block;">{{userNameMessage}}</div>
                    <!--<div class="login-tips" style="display: block;">用户名错误</div>-->
                </div>
                <div class="login-item">
                    <label class="login-label" for="pwd">密码：</label>
                    <input v-model="ruleForm.password" type="password" class="login-input" placeholder="请输入您的密码" id="pwd">
                    <div v-if="passwordMessage" class="login-tips" style="display: block;">{{passwordMessage}}</div>
                </div>
                <!--<div class="login-item">-->
                    <!--<label class="login-label" for="code">验证码：</label>-->
                    <!--<input type="text" class="login-input login-input-code" placeholder="请输入验证码" id="code">-->
                    <!--<div class="login-code">-->
                        <!--<img src="../../static/css/images/pic/code.png" alt="" class="login-code-pic">-->
                        <!--<span class="login-code-text">看不清？换一张</span>-->
                    <!--</div>-->
                    <!--<div class="login-tips" style="display: block;">验证码错误，请检查并重新输入</div>-->
                <!--</div>-->
                <div class="login-item-btn">
                    <a href="#" class="login-btn" v-on:click="submitForm()">登录</a>
                </div>
                <!--<div class="login-item-text">-->
                    <!--<div class="login-remember is-active"><i></i>记住密码</div>-->
                    <!--<div class="login-account"><a href="#">忘记密码?</a><span>|</span><a href="#" class="text-white">立即注册</a></div>-->
                <!--</div>-->
            </div>
            <div class="login-main-foot">
                <p>
                    <span>中节能天融科技有限公司</span>
                    <span>版权所有</span>
                </p>
                <p>
                    <span>Copyright © {{startYear}}-{{endYear}} </span>
                    <span>All Right Reserved </span>
                    <span>京ICP备10207363-1号</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import bwEncrypt from "./common/unit/BwEncrypt";

    export default {
        name: "loginHtml",
        data(){
            return{
                startYear: 2019,
                endYear: 2019,
                userNameMessage: '',
                passwordMessage: '',
                ruleForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            validateFrom(){
                if (!this.ruleForm.username){
                    this.userNameMessage = "请输入账号";
                    return false;
                }else if (!this.ruleForm.password){
                    this.passwordMessage = "请输入密码";
                    return false;
                }else {
                    return true;
                }
            },
            submitForm() {
                if (this.validateFrom()) {
                    this.sendLoginReq();
                };
            },
            sendLoginReq(){
                let self = this;

                let params2 = {
                    userName: this.ruleForm.username,
                    password: bwEncrypt(this.ruleForm.password)
                };

                this.ajaxUtil.sendPost(this.AppConfig.gkzApi+"/login/r/login",params2).then(function (data) {

                    if (data.code == 0){
                        self.$message.success("登录成功！");
                        self.$router.push('/amfHomeHtml');
                    }

                }).catch(function (err) {
                    console.log(err);
                })

            },
            initCopyRightTime(){
                var date = new Date();
                this.startYear = date.getFullYear();
                this.endYear = this.startYear + 100;
            }
        },
        created() {
            this.initCopyRightTime();
        }
    }
</script>

<style scoped>

</style>
