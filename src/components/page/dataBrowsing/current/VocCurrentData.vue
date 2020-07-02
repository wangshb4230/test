<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>详情列表</span>
                <span style="float: right;color:#ccc">* 每分钟自动刷新数据</span>
            </div>
            <el-table
                :data="vocCurrentData"
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
                    prop="tvoc"
                    label="TVOC (mg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="nh3"
                    label="NH₃ (mg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="h2s"
                    label="H₂S (mg/m³)"
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
        name: "vocMonitor",
        data() {
            return {
                vocCurrentData: [],
                voc_intervalId:null
            }
        },
        methods: {
            getVocCurrentData (){
                let _self = this
                let params = {
                    subType: 'POL',
                    vv: Math.random()
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/dataview/r/getLastDevByType",params).then(function (data) {

                    console.log(data)
                    _self.vocCurrentData = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            },
            dataRefreh() {
                // 计时器正在进行中，退出函数
                if (this.voc_intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.voc_intervalId = setInterval(() => {
                    console.log("刷新" + new Date())
                    this.getVocCurrentData()
                }, 60000)
            },
            // 停止定时器
            clear() {
                clearInterval(this.voc_intervalId); //清除计时器
                this.voc_intervalId = null; //设置为null
            }
        },
        mounted() {
            this.getVocCurrentData()
            this.dataRefreh()
        },
        beforeDestroy() {
            this.clear()
        }
    }
</script>

<style scoped>

</style>
