<template>
    <div>
        <el-card class="box-card">
            <span>查询条件</span>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="排序方向:">
                    <el-select v-model="formInline.sortType">
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
                :data="predictionData"
                style="width: 100%"
                empty-text="暂无数据！">
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="预计开始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="预计结束时间">
                </el-table-column>
                <el-table-column
                    prop="paramName"
                    label="污染物"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="paramValue"
                    label="浓度(μg/m³)"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="pollLevel"
                    label="污染等级"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="predictTime"
                    label="发布时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handlePlan(scope.$index, scope.row)">查看抑尘计划
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handleNotice(scope.$index, scope.row)">查看预警通知
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination ref="paginationObj" @paginationFunction="paginationFunction"></Pagination>
        </el-card>
        <!--抑尘计划弹出框-->
        <el-dialog title="查看抑尘计划" :visible.sync="planDialogVisible" :modal-append-to-body="false">
            <li><span>计划ID:</span> <span>{{planDetail.planId}}</span></li>
            <li><span>来源业务模块:</span> <span>{{planDetail.srcModule}}</span></li>
            <li><span>抑尘设备启动时间:</span> <span>{{planDetail.startTime}}</span></li>
            <li><span>抑尘设备停止时间:</span> <span>{{planDetail.endTime}}</span></li>
            <li><span>审核状态:</span> <span></span>{{planDetail.checkStatus}}</li>
            <li><span>审核状态描述:</span> <span>{{planDetail.checkMsg}}</span></li>
            <li><span>执行结果:</span> <span>{{planDetail.result}}</span></li>
            <li><span>执行结果描述:</span> {{planDetail.resultMsg}}<span></span></li>
            <li><span>创建时间:</span> {{planDetail.createTime}}<span></span></li>

<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="planDialogVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="planDialogVisible = false">确 定</el-button>-->
<!--            </div>-->
        </el-dialog>
        <!--预警通知弹出框-->
        <el-dialog title="查看预警通知" :visible.sync="noticeDialogVisible">


            <!--            <div slot="footer" class="dialog-footer">-->
            <!--                <el-button @click="planDialogVisible = false">取 消</el-button>-->
            <!--                <el-button type="primary" @click="planDialogVisible = false">确 定</el-button>-->
            <!--            </div>-->
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from "../../common/unit/Pagination";

    export default {
        name: "prediction",
        components: {
            Pagination
        },
        data() {
            return {
                planDialogVisible: false,
                noticeDialogVisible: false,
                predictionData: [],
                planDetail: {},
                formInline: {
                    sortType: '2',
                }
            }
        },
        methods: {
            paginationFunction() {
                this.onSubmit()
            },
            onSubmit() {
                let _self = this
                let params = {
                    pageNo: _self.$refs.paginationObj.cur_page,
                    pageSize: _self.$refs.paginationObj.cur_pageSize,
                    startTime: '',
                    endTime: '',
                    orderType: this.formInline.sortType,
                    vv: Math.random()
                }
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi + "/poll/r/getPredict", params).then(function (data) {
                    console.log(params)
                    // console.log(data)
                    _self.predictionData = data.data.data
                    console.log(_self.predictionData)
                    _self.$refs.paginationObj.count = data.data.total;

                }).catch(function (err) {
                    console.log(err);
                })

            },
            /*弹出框*/
            handlePlan(index, row) {
                this.planDialogVisible = true
                console.log(index, row);
                let _self = this
                let params = {
                    predictId: 1,
                    vv: Math.random()
                }
                this.ajaxUtil.sendGet(this.AppConfig.gkzApi + "/poll/r/getPlanByPredictId", params).then(function (data) {
                    console.log(params)
                    console.log(data)
                    _self.planDetail = data.data

                }).catch(function (err) {
                    console.log(err);
                })
            },
            handleNotice(index, row) {
                console.log(index, row);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
