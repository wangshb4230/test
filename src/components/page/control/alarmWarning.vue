<template>
    <div class="main">
            <div class="main-top" style="margin-top: 15px">
                <div class="breadcrumb" style="background-color: #ffffff;padding:10px 30px 20px">
                    <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>污染管控</a><span class="sep">&gt;</span><span
                    class="text-primary">污染报警预警</span>
                </div>
            </div>
        <div style="height: 127px;background-color: #ffffff;padding:20px 30px 30px;margin-top: 15px">
            <div style="height: 35px">
                <div style="width: 5px;height: 18px;background-color: #157edb;float: left"></div>
                <div style="float: left;margin-left: 10px; ">查询条件</div>
            </div>
            <div>
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="审核状态: ">
                        <el-select v-model="formInline.checkStatus" placeholder="不限">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下发状态: ">
                        <el-select v-model="formInline.execResult" placeholder="不限">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序方向: ">
                        <el-select v-model="formInline.sortType" placeholder="请选择">
                            <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="searchInit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--------->
        <!--------------------->
        <div style="margin-top:15px;padding: 20px 30px 30px;background-color: #FFFFFF">
            <div style="height: 35px">
                <div style="width: 5px;height: 18px;background-color: #157edb;float: left"></div>
                <div style="float: left;margin-left: 10px; ">详情列表</div>
            </div>
            <el-table :data="tableData" style="width: 100%" stripe border>
                <el-table-column
                    type="index"
                    label="序号" :index="getIndex" align="center" width="80">
                </el-table-column>
                <el-table-column prop="noticeId"  align="center" label="ID"  ></el-table-column>
                <el-table-column prop="srcModule"  align="center" label="来源业务模块"  ></el-table-column>
                <el-table-column prop="checkStatus"  align="center" label="审核状态" :formatter="hasAir"></el-table-column>
                <el-table-column prop="checkMsg"  align="center" label="审核状态描述"  ></el-table-column>
                <el-table-column prop="result"  align="center" label="下发状态" :formatter="hasAirPoll"></el-table-column>
                <el-table-column prop="createTime"  align="center" label="创建时间"></el-table-column>
                <el-table-column label="操作"  align="center" width="280">
                    <template slot-scope="solt">
                        <el-button type="primary" v-if="solt.row.checkStatus==0" @click="openDialog(solt.row)" >审核</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </div>
        <!--pageHelper-->
        <div class="el-pagination">
            <pagination ref="paginationObj" @paginationFunction="paginationFunction" ></pagination>
        </div>
        <!--弹框  1 -->
        <div>
            <el-dialog title="审核通知" append-to-body  :visible.sync="dialogFormVisible" width="35%" @close="closeDialog">

                <el-form :model="formUpdate">
                    <el-form-item label="通知ID" :label-width="formLabelWidth">
                        <el-input v-model="formUpdate.noticeId" style="width: 220px" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态" :label-width="formLabelWidth">
                        <el-select v-model="formUpdate.checkStatus" placeholder="不限">
                            <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核信息描述状态" :label-width="formLabelWidth">
                        <el-input v-model="formUpdate.checkMsg" style="width: 220px"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="updateDataWu()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Pagination from '../../../components/common/unit/Pagination'
    export default {
        name: "source",
        components:{
            Pagination
        },
        data(){
            return{
                formInline: {
                    execResult: '',
                    checkStatus: '',
                    sortType: '2'
                },
                options:[
                        {value:'',name:'不限'},
                        {value:'0',name:'待审核'},
                        {value:'-1',name:'未通过'},
                        {value:'1',name:'通过'}
                    ],
                options2:[
                    {value:'',name:'不限'},
                    {value:'0',name:'待发送'},
                    {value:'-1',name:'取消/失败'},
                    {value:'1',name:'发送成功'},
                    {value:'2',name:'发送中'}
                    ],
                options3:[
                    {value:'2',name:'时间倒序'},
                        {value:'1',name:'时间顺序'},
                    ],
                options4:[
                    {value:'0',name:'待审核'},
                    {value:'-1',name:'未通过'},
                    {value:'1',name:'通过'}
                ],
                tableData:[],
                dialogFormVisible:false,
                formUpdate:{
                    noticeId:'',
                    checkStatus:'',
                    checkMsg:'',
                },
                formLabelWidth: '120px',
            }
        },
        mounted(){
            this.initPage();
        },
        methods:{
            closeDialog: function () {
                this.dialogFormVisible = false;
                // this.formUpdate.coordX='';
                // this.formUpdate.coordY='';
                // this.formUpdate.name='';
                // this.formUpdate.deviceId='';
                // this.formUpdate.oriDeviceId='';
            },
            openDialog: function (row) {
                this.formUpdate.checkStatus = row.checkStatus+'';
                this.formUpdate.noticeId = row.noticeId;
                this.formUpdate.checkMsg = row.checkMsg;
                this.dialogFormVisible = true;
            },
            hasAir:function(row,cel,str){
                let strTet="";
                if(null===str||''===str){
                    return '--';
                }else {
                    if(str==0){
                        strTet='待审核';
                    }
                    if(str==-1){
                        strTet='未通过';
                    }
                    if(str==1){
                        strTet='通过';
                    }
                    if(str==2){
                        strTet='发送中';
                    }
                }
                return  strTet;
            },
            hasAirPoll:function(row,cel,str){
                let strTet="";
                if(null===str||''===str){
                    return '--';
                }else {
                    if(str==0){
                        strTet='待发送';
                    }
                    if(str==-1){
                        strTet='取消/失败';
                    }
                    if(str==1){
                        strTet='发送成功';
                    }
                }
                return  strTet;
            },
            searchInit:function(){
                this.initPage();
            },
            paginationFunction() {
                this.initPage();
            },
            getIndex(index){
                let curPage = this.$refs.paginationObj.cur_page;
                let limitPage = this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            initPage: function () {
                let _this = this;
                let  pageNo=_this.$refs.paginationObj.cur_page;
                let   pageSize=_this.$refs.paginationObj.cur_pageSize;
                let params2 = {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    startTime: '',
                    endTime: '',
                    checkStatus:_this.formInline.checkStatus,
                    execResult: _this.formInline.execResult,
                    orderType: _this.formInline.sortType,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/r/getNotice", params2).then(function (data) {
                    if (data.code == 0) {
                        if(data.data.data.length>0){
                            _this.$refs.paginationObj.count=data.data.total;
                            _this.tableData = data.data.data;
                        }
                    }

                }).catch(function (err) {
                    console.log(err);
                })
            },
            updateDataWu: function () {
                let _this = this;
                let f = _this.formUpdate;
                let params2 = {
                    noticeId: f.noticeId,
                    checkStatus: f.checkStatus,
                    checkMsg: f.checkMsg,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/u/checkNotice", params2).then(function (data) {

                    if (data.code == 0) {
                        _this.$message({
                            message: '审核成功',
                            type: 'success'
                        });
                        _this.closeDialog();
                        _this.initPage();
                    } else {
                        _this.$message("审核失败，请重试！");
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
        }
    }
</script>

<style scoped>
    .fuceng{padding: 0px 20px 60px;}
    .fuceng h2{font-size: 16px;color: #000;font-weight: 600;line-height: 30px;padding-left: 10px;border-bottom: 1px solid #0AC4AC;}
    .fuceng ul{padding: 11px 0;}
    .fuceng ul li{height: 30px;line-height: 30px;}
    .fuceng ul li span{font-size: 12px;}
    .fuceng ul li .label{width: 90px;display: block;float: left;padding-right: 15px;text-align: right;}
    .fuceng ul li .paramValue{color: #000000;margin-left: 100px;display: block;font-size: 14px;}
</style>
