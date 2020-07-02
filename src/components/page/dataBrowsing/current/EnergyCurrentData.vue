<template>
    <div>
        <button @click="getEnergyCurrentData">提交</button>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>详情列表</span>
                <span style="float: right;color:#ccc">* 每分钟自动刷新数据</span>

            </div>
            <el-table
                :data="energyCurrentData"
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
                    prop="water"
                    label="用水量 (m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="energy"
                    label="用电量 (度)"
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
        name: "energyMonitor",
        data() {
            return {
                energyCurrentData: [],
                energy_intervalId:null,
            }
        },
        methods: {
            getEnergyCurrentData (){
                let _self = this
                let params = {
                    type: 'ENG',
                    vv: Math.random()
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/dataview/r/getLastDevByType",params).then(function (data) {

                    console.log(data)
                    _self.energyCurrentData = data.data
                    for (let i = 0;i< _self.energyCurrentData.length;i++){
                        if (_self.energyCurrentData[i].name == '水表') {
                            _self.energyCurrentData[i].water = _self.energyCurrentData[i].valueReal
                            _self.energyCurrentData[i].energy = '--'
                        }else {
                            _self.energyCurrentData[i].energy = _self.energyCurrentData[i].valueReal
                            _self.energyCurrentData[i].water = '--'
                        }
                    }


                }).catch(function (err) {
                    console.log(err);
                })
            },
            dataRefreh() {
                // 计时器正在进行中，退出函数
                if (this.energy_intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.energy_intervalId = setInterval(() => {
                    console.log("刷新" + new Date())
                    this.getEnergyCurrentData()
                }, 60000)
            },
            // 停止定时器
            clear() {
                clearInterval(this.energy_intervalId); //清除计时器
                this.energy_intervalId = null; //设置为null
            }
        },
        mounted() {
            this.getEnergyCurrentData()
            this.dataRefreh()
        },
        beforeDestroy() {
            this.clear()
        }
    }
</script>

<style scoped>

</style>
