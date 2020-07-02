<template>
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#">
                    <i class="icon icon-zhihuijianguan menu-icon"></i>统计分析</a>
                <span class="sep">&gt;</span> <span class="text-primary">空气监测</span>
                <span class="sep">&gt;</span> <span class="text-primary">实时排名</span>
            </div>
        </div>

        <div class="panel">
            <div class="panel-bd" >
                <div>
                    <div style="position: relative;font-weight: 800;"><span class="shu"></span>详情列表</div>
                        <!--<div class="">
                            <form class="">
                                <div class=""  style="float: right">
                                    <div class="" style="float: left;margin-right: 20px;margin-top: 5px">
                                        <label class="">排序方向：</label>
                                        <template>
                                            <el-radio-group v-model="orderTypeReal">
                                                <el-radio  label="1" key="1">最优排名</el-radio>
                                                <el-radio  label="2" key="2">最差排名</el-radio>
                                            </el-radio-group>
                                        </template>
                                    </div>
                                    <div style="float: left">
                                        <el-radio-group v-model="paramId" size="medium">
                                            <el-radio-button label="tvoc" key="tvoc">TVOC</el-radio-button>
                                            <el-radio-button label="nh3" key="nh3">NH₃</el-radio-button>
                                            <el-radio-button label="h2s" key="h2s">H₂S</el-radio-button>
                                        </el-radio-group>
                                    </div>

                                </div>
                            </form>
                        </div>-->

                        <div style="width: 100% ;margin-left: 75%;margin-bottom: -20px">
                            <el-form  :inline="true">

                                <el-form-item style="margin-left: 5px ;"  >
                                    <el-radio-group v-model="orderTypeReal">
                                        <el-radio  label="1" key="1">最优排名</el-radio>
                                        <el-radio  label="2" key="2">最差排名</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item style="margin-left: 5px ;"  >
                                    <el-radio-group v-model="paramId" size="medium">
                                        <el-radio-button label="tvoc" key="tvoc">TVOC</el-radio-button>
                                        <el-radio-button label="nh3" key="nh3">NH₃</el-radio-button>
                                        <el-radio-button label="h2s" key="h2s">H₂S</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                            </el-form>
                        </div>

                        <div id="vocRealRanking" style="width: 100%;height: 500px;"></div>


                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "vocRealRanking",
        data(){
            return{
                orderTypeReal:"1",
                paramId:"tvoc",
                subType: 'POL',
            }
        },
        mounted() {
            this.initCharts()
        },

        methods:{

            initCharts(){
                let _this=this;
                let paramId =  _this.paramId
                let params = {
                    orderType: _this.orderTypeReal,
                    paramId: paramId,
                    subType: _this.subType,
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi+"/stat/r/getRankReal",params).then(function (data) {
                    if (data.code == 0){
                        var dataX = [];
                        var dataY = [];
                        for(var i = 0 ; i < data.data.length ; i++){
                            dataY.push(data.data[i][paramId]);
                            dataX.push(data.data[i].name);
                        }
                        _this.realRanking(dataX,dataY)
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },

            realRanking(dataX,dataY){
                var that  = this
                var chart = echarts.init(
                    document.getElementById("vocRealRanking"),
                    "skinUpp"
                );

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




