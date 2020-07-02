<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>详情列表</span>
                <span style="float: right;color:#ccc">* 每分钟自动刷新数据</span>
            </div>
            <el-table
                :data="dustCurrentData"
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
                    prop="tsp"
                    label="TSP (mg/m³)"
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
                    prop="dataTime"
                    label="时间">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: "dustMonitor",
        data() {
            return {
                dustCurrentData: [],
                dust_intervalId:null
            }
        },
        methods: {
            getDustCurrentData (){
                let _self = this
                let params = {
                    subType: 'DST',
                    vv: Math.random()
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/dataview/r/getLastDevByType",params).then(function (data) {

                    console.log(data)
                    _self.dustCurrentData = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            },
            dataRefreh() {
                // 计时器正在进行中，退出函数
                if (this.dust_intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.dust_intervalId = setInterval(() => {
                    console.log("刷新" + new Date())
                    this.getDustCurrentData()
                }, 60000)
            },
            // 停止定时器
            clear() {
                clearInterval(this.dust_intervalId); //清除计时器
                this.dust_intervalId = null; //设置为null
            }
        },
        mounted() {
            this.getDustCurrentData()
            this.dataRefreh()
        },
        beforeDestroy() {
            this.clear()
        }
    }
</script>

<style scoped>

</style>
