<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>详情列表</span>
                <span style="float: right;color:#ccc">* 每分钟自动刷新数据</span>
            </div>
            <el-table
                :data="controlCurrentData"
                style="width: 100%"
                empty-text="无数据">
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="targetId"
                    label="国控站ID">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="国控站名称">
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
                    prop="so2"
                    label="SO₂ (μg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="no2"
                    label="NO₂ (μg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="co"
                    label="CO (mg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="o3"
                    label="O₃ (μg/m³)"
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
        name: "controlMonitor",
        data() {
            return {
                controlCurrentData: [],
                control_intervalId:null
            }
        },
        methods: {
            getControlCurrentData (){
                let _self = this
                let params = {
                    vv: Math.random()
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/dataview/r/getLastSta",params).then(function (data) {

                    console.log(data)
                    _self.controlCurrentData = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            },
            dataRefreh() {
                // 计时器正在进行中，退出函数
                if (this.control_intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.control_intervalId = setInterval(() => {
                    console.log("刷新" + new Date())
                    this.getControlCurrentData()
                }, 60000)
            },
            // 停止定时器
            clear() {
                clearInterval(this.control_intervalId); //清除计时器
                this.control_intervalId = null; //设置为null
            }
        },
        mounted() {
            this.getControlCurrentData()
            this.dataRefreh()
        },
        beforeDestroy() {
            this.clear()
        }
    }
</script>

<style scoped>

</style>
