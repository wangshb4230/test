<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>查询条件</span>

                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="设备名称">
                    <el-select v-model="devices" placeholder="设备名称">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(device,index) in formInline.devices" :key="index" :label="device.name" :value="device.deviceId"></el-option>
                    </el-select>
                    </el-form-item>
                    <!--日期类型-->
                    <el-form-item label="日期类型">
                        <el-radio-group v-model="formInline.dataType">
                            <el-radio label="原始" value="R"></el-radio>
                            <el-radio label="分钟" value="M"></el-radio>
                            <el-radio label="小时" value="H"></el-radio>
                            <el-radio label="日" value="D"></el-radio>
                            <el-radio label="月" value="N"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="日期类型">
                        <el-date-picker
                            v-model="formInline.value1"
                            type="datetimerange"
                            range-separator="-"
                            format="yyyy-MM-dd HH:mm"

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

            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "QueryCard",
        data() {
            return {
                formInline: {
                    sortType: '2',
                    devices: [],
                    dataType: "R",
                    value1: [new Date(),new Date()]
                },
                devices: ''
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            getDeviceName () {
                let _self = this
                let params = {
                    subType: 'DST'
                };
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi+"/device/r/getInfo",params).then(function (data) {

                    console.log(data)
                    _self.formInline.devices = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getDeviceName()
        }
    }
</script>

<style scoped>

</style>
