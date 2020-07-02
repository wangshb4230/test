<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>详情列表</span>
                <span style="float: right;color:#ccc">* 每分钟自动刷新数据</span>
            </div>
            <el-table
                :data="airCurrentData"
                style="width: 100%"
                empty-text="无数据">
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="deviceId"
                    label="设备ID">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="设备名称">
                </el-table-column>
                <el-table-column
                    prop="pm25"
                    label="PM2.5 (μg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="pm10"
                    label="PM10 (μg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="temperature"
                    label="温度 (℃)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="humidity"
                    label="湿度 (%RH)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="windSpeed"
                    label="风力 (m/s)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="windDir"
                    label="风向 (°)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="pressure"
                    label="气压 (kPa)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="dataTime"
                    label="时间">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: "airMonitor",
        data() {
            return {
                airCurrentData: [],
                air_intervalId:null
            }
        },
        methods: {
            getAirCurrentData (){
                let _self = this
                let params = {
                    subType: 'AIR',
                    vv: Math.random()
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/dataview/r/getLastDevByType",params).then(function (data) {

                    console.log(data)
                    _self.airCurrentData = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            },
            dataRefreh() {
                // 计时器正在进行中，退出函数
                if (this.air_intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.air_intervalId = setInterval(() => {
                    console.log("刷新" + new Date())
                    this.getAirCurrentData()
                }, 60000)
            },
            // 停止定时器
            clear() {
                clearInterval(this.air_intervalId); //清除计时器
                this.air_intervalId = null; //设置为null
            }
        },
        mounted() {
            this.getAirCurrentData()
            this.dataRefreh()
        },
        beforeDestroy() {
            this.clear()
        }
    }
</script>

<style scoped>

</style>
