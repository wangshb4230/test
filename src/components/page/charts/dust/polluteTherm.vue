<template>
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>统计分析</a>
                <span class="sep">&gt;</span><span class="text-primary">粉尘检测</span>
                <span class="sep">&gt;</span><span class="text-primary">污染热力图</span>
            </div>
        </div>
        <div class="panel">
            <div style="padding-top:20px ">
                <el-divider direction="vertical"></el-divider>
                    <span>详情列表</span>
                </div>
            <el-divider></el-divider>
            <div style="float: right">
                <el-button-group>
                    <el-button type="text" style="color: #f5f7fa;font-size: 18px;">更新时间:</el-button>
                    <el-button type="primary" @click="factorChange('tsp')">TSP</el-button>
                    <el-button type="primary" @click="factorChange('pm10')">PM10</el-button>
                    <el-button type="primary" @click="factorChange('pm25')">PM2.5</el-button>
                </el-button-group>
            </div>
            <div style="background: url(../../../../../static/css/images/charts/big_bg.png)">
                <div style="padding: 50px;">
                    <img src="../../../../../static/css/images/charts/company_bg.png" style="width:100% ">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "polluteTherm",
        data(){

            return {

            }
        },
        mounted: function () {
            this.pageList();
        },
        methods: {
            pageList() {
                let _this = this;
                let params = {
                    pageNo: _this.$refs.paginationObj.cur_page,
                    pageSize: _this.$refs.paginationObj.cur_pageSize,
                    startTime: '',
                    endTime: '',
                    checkStatus: _this.search.examineStatus,
                    execResult: _this.search.execResult,
                    orderType: _this.search.orderByType,
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/r/getPlan", params).then(function (data) {
                    if (data.code == 0) {
                        _this.tableData = data.data.data;
                        _this.$refs.paginationObj.count = data.data.total;
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            factorChange(factor){
                alert("切换"+factor);
            }
        }
    }
</script>

<style scoped>

</style>
