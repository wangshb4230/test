<template>
    <div>
        <el-card class="box-card">

            <span>查询条件</span>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备名称:">
                    <el-select v-model="deviceId" placeholder="设备名称">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(device,index) in formInline.devices" :key="index" :label="device.name"
                                   :value="device.deviceId"></el-option>
                    </el-select>
                </el-form-item>
                <!--日期类型-->
                <el-form-item label="日期类型:">
                    <el-radio-group v-model="dataType">
                        <el-radio label="R">原始</el-radio>
                        <el-radio label="M">分钟</el-radio>
                        <el-radio label="H">小时</el-radio>
                        <el-radio label="D">日</el-radio>
                        <el-radio label="N">月</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="时间范围:">
                    <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="-"
                        :format="data_format"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <br>
                <el-form-item label="排序方向">
                    <el-select v-model="formInline.sortType" placeholder="活动区域">
                        <el-option label="时间倒序" value="2"></el-option>
                        <el-option label="时间顺序" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>详情列表</span>
            </div>
            <el-table
                :data="energyHistoryData"
                style="width: 100%"
                empty-text="暂无数据！">
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
            <Pagination ref="paginationObj" @paginationFunction="paginationFunction"></Pagination>
        </el-card>
    </div>
</template>

<script>
    import Pagination from "../../../common/unit/Pagination";

    export default {
        name: "energyHistoryData",
        components: {
            Pagination
        },
        data() {
            return {
                energyHistoryData: [],
                formInline: {
                    sortType: '2',
                    devices: [],
                },
                data_format: "yyyy-MM-dd HH:mm",
                dataType: '',
                deviceId: '',
                value1: []
            }
        },
        methods: {
            paginationFunction () {
                this.onSubmit()
            },
            onSubmit() {
                let _self = this
                console.log('submit!');
                console.log(this.deviceId)
                console.log(this.dataType)
                console.log(this.formInline.sortType)
                console.log(this.value1)
                let params = {
                    pageNo: _self.$refs.paginationObj.cur_page,
                    pageSize: _self.$refs.paginationObj.cur_pageSize,
                    type: 'ENG',
                    deviceId: this.deviceId,
                    timeType: this.dataType,
                    startTime: this.value1[0],
                    endTime: this.value1[1],
                    orderType: this.formInline.sortType,
                    vv: Math.random()
                }
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi + "/dataview/r/getDevByPeriod", params).then(function (data) {
                    console.log(params)
                    // console.log(data)
                    _self.energyHistoryData = data.data.data
                    console.log(_self.energyHistoryData)
                    _self.$refs.paginationObj.count = data.data.total;
                    for (let i = 0;i< _self.energyHistoryData.length;i++){
                        if (_self.energyHistoryData[i].name == '水表') {
                            _self.energyHistoryData[i].water = _self.energyHistoryData[i].valueReal
                            _self.energyHistoryData[i].energy = '--'
                        }else {
                            _self.energyHistoryData[i].energy = _self.energyHistoryData[i].valueReal
                            _self.energyHistoryData[i].water = '--'
                        }
                    }

                }).catch(function (err) {
                    console.log(err);
                })

            },
            getDeviceName() {
                let _self = this
                let params = {
                    type: 'ENG'
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi + "/device/r/getInfo", params).then(function (data) {

                    console.log(data)
                    _self.formInline.devices = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        watch: {
            dataType: function (newValue, oldValue) {
                let nowTime = new Date()
                let mon = nowTime.getMonth() + 1;
                let day = nowTime.getDate();
                let hours = nowTime.getHours();
                let minute = nowTime.getMinutes();
                let endTime = nowTime.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minute < 10 ? "0" + minute : minute);
                let endTime0 = nowTime.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours) + ":00";
                let endTime1 = nowTime.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
                let endTime2 = nowTime.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon);
                //原始，分钟：前两个小时
                let preTime = new Date();
                preTime.setHours(preTime.getHours() - 2);
                let pmon = preTime.getMonth() + 1;
                let pday = preTime.getDate();
                let phours = preTime.getHours();
                let pminute = preTime.getMinutes();
                let startTime = preTime.getFullYear() + "-" + (pmon < 10 ? "0" + pmon : pmon) + "-" + (pday < 10 ? "0" + pday : pday) + " " + (phours < 10 ? "0" + phours : phours) + ":" + (pminute < 10 ? "0" + pminute : pminute);
                //小时：前24小时
                let onHours = new Date(nowTime - 24 * 3600 * 1000);
                let n0 = onHours.getMonth() + 1;
                let d0 = onHours.getDate();
                let h0 = onHours.getHours();
                let startTime0 = onHours.getFullYear() + "-" + (n0 < 10 ? "0" + n0 : n0) + "-" + (d0 < 10 ? "0" + d0 : d0) + " " + (h0 < 10 ? "0" + h0 : h0) + ":00";
                //日：前30天
                let onDate = new Date(nowTime - 31 * 24 * 3600 * 1000);
                let n1 = onDate.getMonth() + 1;
                let d1 = onDate.getDate();
                let startTime1 = onDate.getFullYear() + "-" + (n1 < 10 ? "0" + n1 : n1) + "-" + (d1 < 10 ? "0" + d1 : d1);
                //月：前12个月
                let onMonth = new Date(nowTime - 365 * 24 * 3600 * 1000);
                let n2 = onMonth.getMonth() + 1;
                let startTime2 = onMonth.getFullYear() + "-" + (n2 < 10 ? "0" + n2 : n2);

                console.log(newValue)
                if (newValue === 'M' || newValue === 'R') {
                    this.data_format = 'yyyy-MM-dd HH:mm'
                    this.value1 = [startTime, endTime]
                } else if (newValue === 'H') {
                    this.data_format = 'yyyy-MM-dd HH:mm'
                    this.value1 = [startTime0, endTime0]
                } else if (newValue === 'D') {
                    this.data_format = 'yyyy-MM-dd'
                    this.value1 = [startTime1, endTime1]
                } else if (newValue === 'N') {
                    this.data_format = 'yyyy-MM'
                    this.value1 = [startTime2, endTime2]
                }
            }
        },
        mounted() {
            this.dataType = 'R'
            this.getDeviceName()
        }
    }
</script>

<style scoped>

</style>
