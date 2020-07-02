<template>
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#">
                    <i class="icon icon-zhihuijianguan menu-icon"></i>统计分析</a>
                <span class="sep">&gt;</span> <span class="text-primary">粉尘监测</span>
                <span class="sep">&gt;</span> <span class="text-primary">历史排名</span>
            </div>
        </div>

        <div class="panel" style="margin-bottom: 10px">
            <div class="panel-bd" >
                <div style="position: relative;font-weight: 800;margin-bottom: 10px"><span class="shu"></span>查询条件</div>
                <el-form  :inline="true">
                    <el-form-item style="margin-left: 5px" label="时间范围： ">
                        <el-date-picker
                            style="width: 430px"
                            v-model="dateValue"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item >
                        <el-button type="primary" icon="el-icon-search" @click="initCharts">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="panel">
            <div class="panel-bd" >
                <div>
                    <div style="position: relative;font-weight: 800;"><span class="shu"></span>详情列表</div>

                    <div style="width: 100% ;margin-left: 75%;margin-bottom: -20px">
                        <el-form  :inline="true">
                            <el-form-item style="margin-left: 5px ;"  >
                                <el-radio-group v-model="orderType" @change="initCharts()">
                                    <el-radio  :label="'1'" key="1">最优排名</el-radio>
                                    <el-radio  :label="'2'" key="2">最差排名</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item style="margin-left: 5px ;"  >
                                <el-radio-group v-model="paramId" size="medium" @change="initCharts()">
                                    <el-radio-button label="pm10" key="pm10">PM10</el-radio-button>
                                    <el-radio-button label="pm25" key="pm25">PM2.5</el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                        </el-form>
                    </div>
                       <!-- <div class="">
                            <form class="">
                                <div class=""  style="float: right">
                                    <div class="" style="float: left;margin-right: 20px;margin-top: 5px">
                                        <label class="">排序方向：</label>
                                        <template>
                                            <el-radio-group v-model="orderType" @change="initCharts()">
                                                <el-radio  :label="'1'" key="1">最优排名</el-radio>
                                                <el-radio  :label="'2'" key="2">最差排名</el-radio>
                                            </el-radio-group>
                                        </template>
                                    </div>
                                    <div style="float: left">
                                        <el-radio-group v-model="paramId" size="medium" @change="initCharts()">
                                            <el-radio-button label="pm10" key="pm10">PM10</el-radio-button>
                                            <el-radio-button label="pm25" key="pm25">PM2.5</el-radio-button>
                                        </el-radio-group>
                                    </div>

                                </div>
                            </form>
                        </div>-->
                        <div id="realRanking" style="width: 100%;height: 500px;">

                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "airHisRanking",
        data(){
            return{
                orderType:"1",
                paramId:"pm10",
                subType: 'AIR',
                dateValue:[new Date(new Date().getTime() - 24*60*60*1000*2),new Date()],
                retCount:'',
            }
        },
        mounted() {
            this.initCharts()
        },

        methods:{

            formt(date){
                var year = date.getFullYear();
                var mouth = date.getMonth()+1;
                if(mouth<10){
                    mouth = '0'+mouth
                }
                var day = date.getDate();
                if(day<10){
                    day = '0'+day
                }
                var hh = date.getHours();
                if(hh<10){
                    hh = '0'+hh
                }
                var mm = date.getMinutes();
                if(mm<10){
                    mm = '0'+mm
                }
                var ss = date.getSeconds();
                if(ss<10){
                    ss = '0'+ss
                }
                return year + "-" + mouth + "-" + day + " "  + hh + ":" + mm ;
            },

            initCharts(){
                let _this=this;
                let paramId = _this.paramId
                var startTime = _this.formt( _this.dateValue[0])
                var endTime  =  _this.formt( _this.dateValue[1])
                let params = {
                    orderType: _this.orderType,
                    paramId: paramId,
                    subType: _this.subType,
                    startTime:startTime,
                    endTime:endTime,
                    retCount:_this.retCount,
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi+"/stat/r/getRankHistory",params).then(function (data) {
                    if (data.code == 0){
                        var dataX = [];
                        var dataY = [];
                        for(var i = 0 ; i < data.data.length ; i++){
                            dataY.push(data.data[i][paramId]);
                            dataX.push(data.data[i].name);
                        }
                        _this.hisRanking(dataX,dataY)
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },

            hisRanking(dataX,dataY){
                var that =  this;
                var chart = echarts.init( document.getElementById("realRanking"), "skinUpp" );

                chart.setOption({
                    title: {
                        text: '',
                        subtext: ''
                    },
                    xAxis: {
                        data: dataX,
                        axisLabel: {
                            color: '#333'
                        },
                        axisTick: {
                            show: true,
                            lineStyle:{
                                color: '#999'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color: '#999'
                            }
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color: '#999'
                            }
                        },
                        axisTick: {
                            show: true,
                            lineStyle:{
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            color: '#333'

                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    axisPointer:{
                        show: true,
                        type:'line',
                        axis:'auto'
                    },
                    tooltip:{
                        show:true,
                        trigger:'axis',
                        formatter:function(params){
                            var relVal =params[0].name;
                            if(that.paramId == 'tsp'){
                                relVal +=': '+params[0].value+ '(mg/m³)';
                            }else{
                                relVal +=': '+params[0].value+ '(μg/m³)';
                            }
                            return relVal;
                        },
                        axisPointer:{
                            show: true,
                            type: 'cross'
                        },
                        showDelay:0,
                        hideDelay:50,
                        transitionDuration:0,
                        backgroundColor:'rgba(50,50,50,1)',
                        borderColor:'#aaa',
                        showContent: true,
                        borderRadius:8,
                        padding:10
                    },
                    series: [{
                        type: 'bar',
                        barMaxWidth:60,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: dataY
                    }]
                });

            }

        }
    }
</script>

<style >
    .shu{
        display: block;float: left;width: 4px;height: 16px;background-color: #157edb;border-radius: 2px;margin: 3px 6px;
    }
</style>



