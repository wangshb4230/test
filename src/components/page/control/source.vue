<template>
    <div class="main">
            <div class="main-top" style="margin-top: 15px">
                <div class="breadcrumb" style="background-color: #ffffff;padding:10px 30px 20px">
                    <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>污染管控</a><span class="sep">&gt;</span><span
                    class="text-primary">污染溯源</span>
                </div>
            </div>
        <div style="height: 127px;background-color: #ffffff;padding:20px 30px 30px;margin-top: 15px">
            <div style="height: 35px">
                <div style="width: 5px;height: 18px;background-color: #157edb;float: left"></div>
                <div style="float: left;margin-left: 10px; ">查询条件</div>
            </div>
            <div>
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="污染来源: ">
                        <el-select v-model="formInline.hasAirPoll" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序方向: ">
                        <el-select v-model="formInline.sortType" placeholder="请选择">
                            <el-option
                                v-for="item in options2"
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
                <el-table-column prop="startTime"  align="center" label="污染开始时间"  ></el-table-column>
                <el-table-column prop="endTime"  align="center" label="污染结束时间"  ></el-table-column>
                <el-table-column prop="paramName"  align="center" label="污染物"></el-table-column>
                <el-table-column prop="paramValue"  align="center" label="浓度(μg/m³)" ></el-table-column>
                <el-table-column prop="pollLevel"  align="center" label="污染等级"  ></el-table-column>
                <el-table-column prop="hasAirPoll"  align="center" label="污染原因"  :formatter="hasAir"></el-table-column>
                <el-table-column prop="traceAreas"  align="center" label="污染来源"  :formatter="strToLine"></el-table-column>
                <el-table-column label="操作"  align="center" width="280">
                    <template slot-scope="solt">
                        <el-button type="primary"  @click="openDialog(solt.row)" >启动雾炮</el-button>
                        <el-button type="primary"  @click="openDialog(solt.row)" >查看报警通知</el-button>
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
            <el-dialog title="查看报警通知" append-to-body  :visible.sync="dialogFormVisible" width="35%" >
                <div class="fuceng">
                    <h2>{{formUpdate.title}}</h2>
                    <ul class="paramBox">
                        <li><span class="label">审核状态：</span><span class="paramValue">{{formUpdate.checkStatus}}</span></li>
                        <li><span class="label">下发状态：</span><span class="paramValue">{{formUpdate.result}}</span></li>
                        <li><span class="label">污染等级：</span><span class="paramValue">{{formUpdate.pollLevel}}</span></li>
                        <li><span class="label">污染物：</span><span class="paramValue">{{formUpdate.paramName}}</span></li>
                        <li><span class="label">污染物浓度：</span><span class="paramValue">{{formUpdate.paramValue+getUnit(formUpdate.paramId)}}</span></li>
                        <li><span class="label">发生时间：</span><span class="paramValue">{{formUpdate.startTime}}</span></li>
                        <li><span class="label">结束时间：</span><span class="paramValue">{{formUpdate.endTime}}</span></li>
                        <li><span class="label">措施建议：</span><span class="paramValue">{{formUpdate.advice}}</span></li>
                    </ul>
                </div>
<!--                <div slot="footer" class="dialog-footer">-->
<!--                    <el-button @click="closeDialog">取 消</el-button>-->
<!--                    <el-button type="primary" @click="updateData()">确 定</el-button>-->
<!--                </div>-->
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
                    hasAirPoll: '',
                    sortType: '2'
                },
                options:[
                        {value:'',name:'不限'},
                        {value:'0',name:'本厂区'},
                        {value:'1',name:'大气污染'}
                    ],
                options2:[
                    {value:'2',name:'时间倒序'},
                        {value:'1',name:'时间顺序'},
                    ],
                tableData:[],
                dialogFormVisible:false,
                formUpdate:{
                    title:'',
                    checkStatus:'',
                    result:'',
                    pollLevel:'',
                    paramName:'',
                    paramValue:'',
                    startTime:'',
                    endTime:'',
                    advice:'',
                    paramId:'',
                },

            }
        },
        mounted(){
            this.initPage();
        },
        methods:{
            getUnit:function (param){
                if(param == 'pm10' || param == 'pm25'){
                    return ' μg/m³';
                }else if(param == 'tsp' || param == 'tvoc' || param == 'nh3' || param == 'h2s'){
                    return ' mg/m³';
                }

            },
            openDialog: function (row) {
                this.formUpdate = row;
                this.dialogFormVisible = true;
                this.getAlertByEventId(row);
            },
            hasAir:function(row,cel,str){
                let strTet="";
                if(null===str||''===str){
                    return '--';
                }else {
                    if(str==0){
                        strTet='本厂区';
                    }
                    if(str==1){
                        strTet='大气污染';
                    }
                }
                return  strTet;
            },
            strToLine:function(row,cel,str){
                let strTet="";
                if(null==str||''==str){
                    return '--';
                }else {
                    for(let i=0;i<str.length;i++){
                        strTet+=str[i]+','
                    }
                }
                if (strTet.length > 0) {
                    strTet = strTet.substr(0, strTet.length - 1);
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
            getAlertByEventId: function (objData) {
                let _this = this;
                let params2 = {
                    type: 'EVT',
                    eventId: objData.eventId ,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/r/getAlertByEventId", params2).then(function (data) {
                    if (data.code == 0) {
                        _this.formUpdate = data.data.data;
                        if(data.data.dataNotice.checkStatus == 0){
                            _this.formUpdate.checkStatus = '待审核';
                        }else if(data.data.dataNotice.checkStatus < 0){
                            _this.formUpdate.checkStatus = '未通过';
                        }else{
                            _this.formUpdate.checkStatus = '通过';
                        }
                        if(data.data.dataNotice.result == 0){
                            _this.formUpdate.result = '待发送';
                        }else if(data.data.dataNotice.result < 0){
                            _this.formUpdate.result = '取消/失败';
                        }else if(data.data.dataNotice.result == 1){
                            _this.formUpdate.result = '发送成功';
                        }else if(data.data.dataNotice.result == 2){
                            _this.formUpdate.result = '发送中';
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            initPage: function () {
                let _this = this;
                let  pageNo=_this.$refs.paginationObj.cur_page;
                let   pageSize=_this.$refs.paginationObj.cur_pageSize;
                let params2 = {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    startTime:'',
                    endTime:'',
                    hasAirPoll:_this.formInline.hasAirPoll,
                    orderType: _this.formInline.sortType,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/r/getTrace", params2).then(function (data) {
                    if (data.code == 0) {
                        if(data.data.data.length>0){
                            _this.$refs.paginationObj.count=data.data.data.length;
                            _this.tableData = data.data.data;
                        }
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
