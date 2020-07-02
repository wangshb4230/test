<template>
    <div class="main">
        <div class="main-top" style="margin-top: 15px">
            <div class="breadcrumb" style="background-color: #ffffff;padding:10px 30px 20px">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>系统管理</a><span class="sep">&gt;</span><span
                class="text-primary">系统配置</span>
            </div>
        </div>
        <div style="padding: 30px;background-color: #FFFFFF;margin-top: 20px">
            <table style="width: 100%;border: 1px solid #EBEEF5">
                <tr style="background-color: #FFFFFF;">
                    <th class="cl">是否启用粉尘超标联动雾炮</th>
                    <th class="cl">粉尘超标阈值(mg/m³)</th>
                </tr>
                <tr>
                    <td class="ch">
                        <el-switch  @change="switchChange"
                                    v-model="formUp.stateS"
                                    active-color="#13ce66"
                                    inactive-color="#d2d2d2">
                        </el-switch>
                    </td>
                    <td class="ch">
                        <el-input v-model="formUp.tspThreshold" style="width: 220px;" @change="updateDataWu"></el-input>
                    </td>
                </tr>
            </table>
            <div style="color: red">*点击单元格设置超标阈值，修改后点击单元格外即可完成设置</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mngConfig",
        data(){
            return{
                tableData:[{name:"是否启用粉尘超标联动雾炮",vale:''}],
                formUp:{
                    tspThreshold:'',
                    stateS:true,
                }

            }
        },
        mounted(){
            this.initPage();
        },
        methods:{
            switchChange:function (data) {
                var tspToFggVal = data == true ? 1 : 0 ;
                var tspToFggName = data == true ? '启用' : '禁用' ;
                this.updateData(tspToFggVal,tspToFggName);
            },
            initPage: function () {
                let _this = this;
                let params2 = {
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_config/r/getConfig", params2).then(function (data) {
                    if (data.code == 0) {
                        _this.formUp.stateS=data.data['gkz.config.tspToFgg']==1?true:false;
                        _this.formUp.tspThreshold=data.data['gkz.config.tspThreshold'];
                    }else {
                        _this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }

                }).catch(function (err) {
                    console.log(err);
                })
            },
            //监听超标联动功能是否启用
            updateData: function (tspToFggVal,tspToFggName) {
                let _this = this;
                let params2 = {
                    name: 'gkz.config.tspToFgg',
                    value:tspToFggVal,
                    vv: Math.random(),

                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_config/u/updConfig", params2).then(function (data) {

                    if (data.code == 0) {
                        _this.$message({
                            message: '超标联动功能已'+tspToFggName,
                            type: 'success'
                        });
                    } else {
                        _this.$message(data.msg);
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            //监听单元格编辑
            updateDataWu: function () {
                let _this = this;
                let params2 = {
                    name: 'gkz.config.tspThreshold',
                    value: _this.formUp.tspThreshold,
                    vv: Math.random()

                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_config/u/updConfig", params2).then(function (data) {

                    if (data.code == 0) {
                        _this.$message({
                            message: 'TSP超标阈值已更改为'+_this.formUp.tspThreshold+ ' mg/m³',
                            type: 'success'
                        });
                        _this.initPage();
                    } else {
                        _this.$message(data.msg);
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
        }
    }
</script>

<style scoped>
.cl{
    background-color: #f8f8f8;
    border-right: 1px solid #EBEEF5;
    text-align: center;
    border-bottom: 1px solid #EBEEF5;
    height: 50px;
}
    .ch{
        text-align: center;
        height: 50px;
    }
</style>
