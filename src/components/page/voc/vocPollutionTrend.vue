<template>
    <div class="main">
        <div class="main-top" style="margin-top: 15px">
            <div class="breadcrumb" style="background-color: #ffffff;padding:10px 30px 20px">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>统计分析</a><span class="sep">&gt;</span>
                <span>VOC监测</span><span class="sep">></span>
                <span class="text-primary"> 污染变化趋势</span>
            </div>
        </div>
        <div style="height: 100px;background-color: #ffffff;padding:20px 30px 30px;margin-top: 15px">
            <div style="height: 35px">
                <div style="width: 5px;height: 18px;background-color: #157edb;float: left"></div>
                <div style="float: left;margin-left: 10px; ">查询条件</div>
            </div>
            <div>
                <el-form :inline="true">
                    <el-form-item label="日期类型: ">
                        <el-radio-group v-model="radio" style="padding-left: 2px;margin-right: 6px" @change="initDateM()">
                            <el-radio class="radioCl" :label="'M'" >分钟</el-radio>
                            <el-radio class="radioCl" :label="'H'">小时</el-radio>
                            <el-radio class="radioCl" :label="'D'">日</el-radio>
                            <el-radio class="radioCl" :label="'N'">月</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="时间范围: ">
                        <el-date-picker
                            v-model="value1"
                            :type="dateTypeText"
                            range-separator="—" :value-format="dataValueTest"
                            :format="dataValueTest"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="searchInit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--------->
        <div style="margin-top:15px;padding: 20px 30px 30px;background-color: #FFFFFF">
            <div style="height: 25px;border-bottom: 1px solid #8c939d;">
                <div style="width: 5px;height: 18px;background-color: #157edb;float: left"></div>
                <div style="float: left;margin-left: 10px; ">详情列表</div>
            </div>
            <div style="margin-top: 10px;float: right">
                <el-radio-group v-model="butRadio" @change="butChangeGroup">
                    <el-radio-button :label="'tvoc'" >TVOC</el-radio-button>
                    <el-radio-button :label="'nh3'">NH₃</el-radio-button>
                    <el-radio-button :label="'h2s'">H₂S</el-radio-button>
                </el-radio-group>
            </div>
            <!--图表-->
            <div id="contrast" style="width: 100%;height: 430px;margin-top: 35px"></div>
        </div>
        <!--------------------->
    </div>
</template>

<script>
    export default {
        name: "pollutionTrend",
        data() {
            return {
                value1: [],
                radio: 'H',
                butRadio: 'tvoc',
                dateTypeTexts:"daterange",
                dateTypeText:"datetimerange",
                dataValueTest:'yyyy-MM-dd HH:mm',
                type:"monthrange",
                startTime:'',
                endTime:'',
                defaultDate:[],
            }
        },
        mounted() {
            this.initDateM(2);
        },
        methods: {
            //初始化时间日期
            initDateM:function(){
                let _this=this;
               let num= _this.radio;
                var endTime="";
                var startTime="";
                //定义时间范围
                var nowTime = new Date();
                var mon = nowTime.getMonth()+1;
                var day = nowTime.getDate();
                var hours = nowTime.getHours();
                var minute = nowTime.getMinutes();
                if(num=='M'){
                    _this.dataValueTest="yyyy-MM-dd HH:mm";
                    _this.dateTypeText="datetimerange";
                    var preTime = new Date();
                    preTime.setHours(preTime.getHours()-2);
                    var pmon = preTime.getMonth()+1;
                    var pday = preTime.getDate();
                    var phours = preTime.getHours();
                    var pminute = preTime.getMinutes();
                     startTime = preTime.getFullYear() + "-" + (pmon<10?"0"+pmon:pmon) + "-" + (pday<10?"0"+pday:pday)+" "+ (phours<10?"0"+phours:phours)  +":"+ (pminute<10?"0"+pminute:pminute);
                    endTime= nowTime.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" + (day<10?"0"+day:day) +" "+ (hours<10?"0"+hours:hours) +":"+ (minute<10?"0"+minute:minute);
                }
                if(num=="H"){
                    _this.dataValueTest="yyyy-MM-dd HH:mm";
                    _this.dateTypeText="datetimerange";
                    var onHours = new Date(nowTime-24*3600*1000);
                    var n0 = onHours.getMonth()+1;
                    var d0 = onHours.getDate();
                    var h0 = onHours.getHours();
                    startTime = onHours.getFullYear() + "-" + (n0<10?"0"+n0:n0) + "-" + (d0<10?"0"+d0:d0)+" "+ (h0<10?"0"+h0:h0)  +":00";
                    endTime = nowTime.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" + (day<10?"0"+day:day) +" "+ (hours<10?"0"+hours:hours) +":00";
                }
                if(num=="D"){
                    _this.dataValueTest="yyyy-MM-dd";
                        _this.dateTypeText="daterange";
                    var onDate = new Date(nowTime-31*24*3600*1000);
                    var n1 = onDate.getMonth()+1;
                    var d1 = onDate.getDate();
                    startTime = onDate.getFullYear() + "-" + (n1<10?"0"+n1:n1) + "-" + (d1<10?"0"+d1:d1);
                    endTime = nowTime.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" + (day<10?"0"+day:day);
                }
                if(num=="N"){
                    _this.dataValueTest="yyyy-MM";
                    _this.dateTypeText="monthrange";
                    var onMonth = new Date(nowTime-365*24*3600*1000);
                    var n2 = onMonth.getMonth()+1;
                    startTime = onMonth.getFullYear() + "-" + (n2<10?"0"+n2:n2);
                    endTime = nowTime.getFullYear() + "-" + (mon<10?"0"+mon:mon);
                }
                _this.value1=[startTime,endTime];
                this.ajaxData(_this.radio,_this.value1[0],_this.value1[1]);
            },
            searchInit: function () {
                let _this = this;
                this.ajaxData(_this.radio,_this.value1[0],_this.value1[1]);
            },
            butChangeGroup:function () {
                let _this = this;
                // _this.butRadio=data;
                this.ajaxData(_this.radio,_this.value1[0],_this.value1[1]);
            },
            ajaxData: function (timeType, startTime, endTime) {
                let _this = this;
                if(timeType=='D'){
                    startTime+=' 00:00';
                    endTime+=' 00:00';
                }
                if(timeType=='N'){
                    startTime+='-01 00:00';
                    endTime+='-01 00:00';
                }
                let params2 = {
                    'subType': 'POL',
                    'timeType': timeType,
                    'startTime': startTime,
                    'endTime': endTime,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/stat/r/getEnvPeriodByDev", params2).then(function (data) {
                    if (data.code == 0) {
                        var dd = data.data;
                        var nameList = [];//设备名的list
                        var idList = [];//设备id的list
                        var timeList = dd.dateList;//时间的list

                        for (let i in dd.data) {
                            idList.push(i);
                            nameList.push(dd.data[i][0].name);
                        }
                        _this.changePollutionType(idList,nameList,timeList,_this.butRadio,dd)
                    }

                }).catch(function (err) {
                    console.log(err);
                })
            },
            changePollutionType: function (idList,nameList,timeList,variate,dd) {
                let _this = this;
                var dataList = [];//数据的list
                for (let i in dd.data) {
                    var dataChild = [];
                    for (let j in dd.data[i]) {
                        dataChild.push(dd.data[i][j][variate])
                    }

                    dataList.push(dataChild);
                }
                // console.log(idList)
                // console.log(nameList)
                // console.log(dataList)
                // console.log(timeList)
                _this.contrast(idList, nameList, dataList, timeList)
            },
            //渲染视图
            contrast: function (idList, nameList, dataList, timeList) {
                var myChart = echarts.init(document.getElementById('contrast'));
//		var COLORS = [];
//		var colorSection = ['#038cc4', '#fbb1d6'];
//
//		COLORS = colorGrading(colorSection, nameList.length);
                var colorList = ['#097aff', '#f69a6a', '#61a0a8', '#ef4566', '#c8c8a9', '#b4bf35', '#ff5a00', '#730046', '#096c3e', '#ffcd30', '#ca07e8', '#83ae9b', '#483b59', '#09e833', '#e88e34', '#c93f0f', '#1b197f', '#83f8ff', '#4ba8ad', '#2bc3cc', '#ffdc03', '#ff1a6a', '#bc0639', '#8c3e5b', '#d9adca', '#f2e7ae', '#4931a8', '#bf9a56', '#f9cdae', '#36f4ff'];
                // console.log(COLORS)
                var seriesdata = [];
                var ymax = 0.0;
                var ymin = 0.0;
                var nameSelected = {};
                var count = 0;

                var visible = {};
                for (var i = 0; i < idList.length; i++) {
                    var dataOption = {};

                    dataOption['type'] = 'line';
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
                //	console.log(seriesdata)
                //	console.log(visible)

                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            show: true,
                            type: 'cross'
                        },
                        formatter: function (params) {
//					var relVal =params[0].name;
//					if($('.btn-set button.active').val() == 'tsp'){
//						relVal +=': '+params[0].value+ '(mg/m³)';
//					}else{
//						relVal +=': '+params[0].value+ '(μg/m³)';
//					}
//
//					return relVal;
                            var html = params[0].name + '<br/>';
                            for (i in params) {
                                var relVal = params[i].seriesName;
                                if (params[i].value == undefined || params[i].value == null) {
                                    params[i].value = '--';
                                }
                                if ($('.btn-set button.active').val() == 'tsp') {
                                    relVal += ': ' + params[i].value + ' mg/m³';
                                } else {
                                    relVal += ': ' + params[i].value + ' μg/m³';
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
                };
                myChart.setOption(option,true);

            }
        }
    }
</script>

<style scoped>
    .radioCl {
        margin-right: 6px;
    }

</style>
<style>
    .radioCl .el-radio__label {
        padding-left: 2px;
    }
</style>
