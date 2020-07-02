<template>
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#">
                    <i class="icon icon-zhihuijianguan menu-icon"></i>统计分析</a>
                <span class="sep">&gt;</span> <span class="text-primary">粉尘监测</span>
                <span class="sep">&gt;</span> <span class="text-primary">对比分析</span>
            </div>
        </div>

        <div class="panel" style="margin-bottom: 10px">
            <div class="panel-bd" >
                <div style="position: relative;font-weight: 800;margin-bottom: 10px"><span class="shu"></span>查询条件</div>
                <el-form  :inline="true">
                    <el-form-item style="margin-left: 5px" label="时间范围： ">
                        <el-radio-group v-model="dateType" @change="initCharts()">
                            <el-radio  :label="'M'" key="M">分钟</el-radio>
                            <el-radio  :label="'H'" key="H">小时</el-radio>
                            <el-radio  :label="'D'" key="D">日</el-radio>
                            <el-radio  :label="'N'" key="N">月</el-radio>
                        </el-radio-group>
                    </el-form-item>
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
                    <div style="width: 100% ;margin-left: 85%;margin-bottom: -20px">
                        <el-form  :inline="true">
                            <el-form-item style="margin-left: 5px ;"  >
                                <el-radio-group v-model="paramId" size="medium" @change="initCharts()">
                                    <el-radio-button label="tsp" key="tsp"></el-radio-button>
                                    <el-radio-button label="pm10" key="pm10"></el-radio-button>
                                    <el-radio-button label="pm25" key="pm25"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div id="comparisons" style="width: 100%;height: 500px;">

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "comparison",
        data(){
            return{
                dateType:'H',
                subType: 'DST',
                dateValue:[new Date(new Date().getTime() - 24*60*60*1000*2),new Date()],
                paramId:'tsp'
            }
        },
        mounted(){
            this.initCharts()
        },
        methods:{

            initCharts(){
                let that=this;
                var startTime = that.formt( that.dateValue[0])
                var endTime  =  that.formt( that.dateValue[1])
                let params = {
                    subType: that.subType,
                    startTime:startTime,
                    endTime:endTime,
                    timeType: that.dateType,
                };
                that.ajaxUtil.sendGet(that.AppConfig.gkzApi+"/stat/r/getEnvPeriodByDev",params).then(function (data) {
                    if (data.code == 0){
                        that.datalist = data.data;
                       /* var dd = data.data;
                        var nameList = [];//设备名的list
                        var idList = [];//设备id的list
                        var timeList = dd.dateList;//时间的list
                        var dataList = [];//数据的list

                        for (i in dd.data) {
                            idList.push(i);
                            nameList.push(dd.data[i][0].name);
                        }
                        that.idList = idList
                        that.nameList = nameList
                        that.timeList = timeList
*/
                        that.changePollutionType(that.paramId)
                        //this.contrast(idList, nameList, dataList, timeList)
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },

            changePollutionType(paramId){
                var that = this
                var dd =  that.datalist ;
                var nameList = [];//设备名的list
                var idList = [];//设备id的list
                var timeList = dd.dateList;//时间的list
                var dataList = [];//数据的list

                /*for (i in dd.data) {*/
                for(var i = 0 ; i < dd.data.length ; i++){
                    idList.push(i);
                    nameList.push(dd.data[i][0].name);
                }
                var dataList = [];//数据的list
                /*for (i in dd.data) {*/
                for(var i = 0 ; i < dd.data.length ; i++){
                    var dataChild = [];
                    for(var j = 0 ; j < dd.data.length ; j++){
                        dataChild.push(dd.data[i][j][paramId])
                    }

                    dataList.push(dataChild);
                }
                that.contrast(idList, nameList, dataList, timeList)

            },

            contrast(idList, nameList, dataList, timeList){
                var that =  this;
                var chart = echarts.init(
                    document.getElementById("comparisons"),
                    "skinUpp"
                );


                var colorList = ['#097aff','#f69a6a','#61a0a8','#ef4566','#c8c8a9','#b4bf35','#ff5a00','#730046','#096c3e','#ffcd30','#ca07e8','#83ae9b','#483b59','#09e833','#e88e34','#c93f0f','#1b197f','#83f8ff','#4ba8ad','#2bc3cc','#ffdc03','#ff1a6a','#bc0639','#8c3e5b','#d9adca','#f2e7ae','#4931a8','#bf9a56','#f9cdae','#36f4ff'];
                // console.log(COLORS)
                var seriesdata = [];
                var ymax = 0.0;
                var ymin = 0.0;
                var nameSelected = {};
                var count = 0;

                var visible = {};
                for (var i = 0; i < idList.length; i++) {
                    var dataOption = {};

                    dataOption['type'] = 'bar';
                    //dataOption['barWidth'] = 5;
                    dataOption['smooth'] = false;
                    var normalSet = {};
                    normalSet['width'] = 2;
                    normalSet['shadowBlur'] = 15;
                    normalSet['shadowColor'] = "rgba(0,0,0,0.7)";
                    //normalSet['opacity'] = 0.1;
                    normalSet['shadowOffsetY'] = 5;

                    dataOption['name'] = nameList[i];
                    var lineStyleSet = {};
                    var areaStyleSet = {};
                    lineStyleSet['normal'] = normalSet;
                    dataOption['lineStyle'] = lineStyleSet
                    dataOption['data'] = dataList[i];

                    var cmpdata = dataList[i];
                    ymax = Math.max(cmpdata);
                    ymin = Math.min(cmpdata);

                    var offset1 = {
                        'offset': 1,
                        'color': '#f4bdfb'
                    };
                    var offset2 = {
                        'offset': 0,
                        'color': '#c7e9ff'
                    };
                    var colorArea = new echarts.graphic.LinearGradient(0, 0, 1, 0, [offset1, offset2], false);
                    var areaNormal = {
                        'color': colorArea,
                        'opacity': 0.05
                    };
                    areaStyleSet['normal'] = areaNormal;
                    //dataOption['areaStyle'] = areaStyleSet;
                    seriesdata.push(dataOption);
                    var tmpNum = idList.length;
                    if (tmpNum >= 5) {
                        //数量大于5只显示前五个
                        if (i <= 5) {
                            visible[idList[i]] = true;
                        } else {
                            visible[idList[i]] = false;
                        }

                    } else {
                        //数量小于5全显示
                        visible[idList[i]] = true;
                    }

                }

                chart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            show: true,
                            type: 'cross'
                        },
                        formatter:function(params){
//					var relVal =params[0].name;
//					if($('.btn-set button.active').val() == 'tsp'){
//						relVal +=': '+params[0].value+ '(mg/m³)';
//					}else{
//						relVal +=': '+params[0].value+ '(μg/m³)';
//					}
//
//					return relVal;
                            var html = params[0].name + '<br/>';
                            for(i in params){
                                var relVal =params[i].seriesName;
                                if(params[i].value == undefined || params[i].value == null){
                                    params[i].value = '--';
                                }
                                if(that.paramId == 'tsp'){
                                    relVal +=': '+params[0].value+ '(mg/m³)';
                                }else{
                                    relVal +=': '+params[0].value+ '(μg/m³)';
                                }
                                html += relVal + '<br/>';

                            }
                            return html;
                        }
                    },
                    color: colorList, //曲线或柱颜色设置//config里配置颜色信息

                    legend: {
                        type: 'scroll',
                        width: '90%',
                        data: nameList, //设备名称列表
                        selectedMode: 'multiple', //'single','multiple',true
                        selected: visible,

                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    toolbox: { //工具栏，可切换模式
                        show: true,
                        orient: 'vertical',
                        top: '10%',
                        right: '1%',
                        itemGap: 20,
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: true
                            },
                            saveAsImage: {
                                show: true
                            }
                            //saveAsImage: {show: true},
                        }
                    },
                    xAxis: {
                        type: 'category',

                        boundaryGap: true,
                        interval: {},
                        splitLine: {
                            show: false,
                        },
                        splitArea: {
                            show: true,
                        },
                        data: timeList
                    },
                    yAxis: [{
                        type: 'value',
                        //splitNumber: 5,
                        axisLabel: {
                            formatter: '{value} '
                        },
                        min: 0
                        //max: ymax,
                    }],
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 100
                    }, {
                        show: true,
                        type: 'slider',
                        y: '93%',
                        start: 0,
                        end: 100
                    }],
                    series: seriesdata
                });

            },



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
        }
    }
</script>

<style scoped>

</style>
