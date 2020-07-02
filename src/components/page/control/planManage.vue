<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>污染管控</a><span class="sep">&gt;</span><span
                    class="text-primary">抑尘计划管理</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd" >
                <!--search-->
                <div>
                    <span>审核状态:
                        <el-select v-model="search.examineStatus" placeholder="请选择">
                            <el-option
                                v-for="item in examineOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                    <span>执行结果:
                        <el-select v-model="search.execResult" placeholder="请选择">
                            <el-option
                                v-for="item in execResultOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                    <span>排序方向:
                        <el-select v-model="search.orderByType" placeholder="请选择">
                            <el-option
                                v-for="item in orderByOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                    <el-button type="primary" @click="pageList">查询</el-button>
                </div>
                <el-divider></el-divider>
                <!-- header -->
                <div>
                    <div style="float: left">
                        <el-button type="primary" @click="addPlanManage">新增计划</el-button>
                    </div>
                    <div style="float: right">
                        <el-popover
                            placement="bottom-start"
                            width="100"
                            trigger="click">
                            <el-checkbox-group v-model="colOptions" :key="index" v-for="(item,index) in colSelect">
                                <el-checkbox :label="colSelect[index]"></el-checkbox>
                            </el-checkbox-group>
                            <el-button slot="reference" >筛选列</el-button>
                        </el-popover>
                        <el-popover
                            placement="bottom-start"
                            width="100"
                            trigger="click">
                            <div>
                                <el-link :underline="false" @click="exportTableData('Csv')">导出到Csv文件</el-link>
                                <el-link :underline="false" @click="exportTableData('Execl')">导出到Execl文件</el-link>
                            </div>
                            <el-button slot="reference" >导出</el-button>
                        </el-popover>
           <!--             <el-button type="primary" v-print="printObj">打印</el-button>-->
                        <el-button @click="prints">打印</el-button>
                    </div>
                </div>
                <!--body-->
                <div style="padding-top: 50px;" >
                    <el-table :data="tableData" stripe border style="width: 98%" ref="tableDataRef">
                        <el-table-column
                            type="index"
                            label="序号" :index="getIndex" align="center" width="80">
                        </el-table-column>
                        <el-table-column v-if="colData[0].istrue" prop="planId" label="计划ID" align="center"></el-table-column>
                        <el-table-column v-if="colData[1].istrue" prop="srcModule" label="来源" align="center"></el-table-column>
                        <el-table-column v-if="colData[2].istrue" prop="startTime" label="雾炮启动时间" align="center"></el-table-column>
                        <el-table-column v-if="colData[3].istrue" prop="endTime" label="雾炮停止时间" align="center"></el-table-column>
                        <el-table-column v-if="colData[4].istrue" prop="checkStatus" label="审核状态" align="center">
                            <template slot-scope="scope">
                                {{checkStatusStr(scope.row.checkStatus)}}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="colData[5].istrue" prop="checkMsg" label="审核状态描述" align="center"></el-table-column>
                        <el-table-column v-if="colData[6].istrue" prop="result" label="执行结果" align="center">
                            <template slot-scope="scope">
                                {{resultStr(scope.row.result)}}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="colData[7].istrue" prop="resultMsg" label="执行结果描述" align="center"></el-table-column>
                        <el-table-column v-if="colData[8].istrue" prop="areas" label="处理区域" align="center">
                            <template slot-scope="scope">
                                {{String(scope.row.areas)}}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="colData[9].istrue" prop="createTime" label="创建时间" align="center"></el-table-column>
                        <el-table-column  width="100"  label="操作" align="center">
                            <template slot-scope="scope">
                                <el-link size="small" type="primary"
                                         @click="auditPlanManage(scope.row)"
                                >审核
                                </el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div  style="display: none">
                    <div ref="print" id="printTable">
                        <el-table :data="tableData" style="width:100%"  ref="tableDataRef">
         <!--                   <el-table-column
                                type="index"
                                label="序号" :index="getIndex" align="center" width="50">
                            </el-table-column>-->
                            <el-table-column v-if="colData[0].istrue" prop="planId" label="计划ID" align="center" width="70"></el-table-column>
                            <el-table-column v-if="colData[1].istrue" prop="srcModule" label="来源" align="center" width="60"></el-table-column>
                            <el-table-column v-if="colData[2].istrue" prop="startTime" label="雾炮启动时间" align="center" width="80"></el-table-column>
                            <el-table-column v-if="colData[3].istrue" prop="endTime" label="雾炮停止时间" align="center" width="80"></el-table-column>
                            <el-table-column v-if="colData[4].istrue" prop="checkStatus" label="审核状态" align="center" width="60"></el-table-column>
                            <el-table-column v-if="colData[5].istrue" prop="checkMsg" label="审核状态描述" align="center" width="80"></el-table-column>
                            <el-table-column v-if="colData[6].istrue" prop="result" label="执行结果" align="center" width="60">
                                <template slot-scope="scope">
                                    {{resultStr(scope.row.result)}}
                                </template>
                            </el-table-column>
                            <el-table-column v-if="colData[7].istrue" prop="resultMsg" label="执行结果描述" align="center" width="80"></el-table-column>
                            <el-table-column v-if="colData[8].istrue" prop="areas" label="处理区域" align="center" width="60">
                                <template slot-scope="scope">
                                    {{String(scope.row.areas)}}
                                </template>
                            </el-table-column>
                            <el-table-column v-if="colData[9].istrue" prop="createTime" label="创建时间" align="center" width="60"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <!--pageHelper-->
                <div class="el-pagination">
                    <pagination ref="paginationObj" @paginationFunction="paginationFunction" ></pagination>
                </div>
            </div>
        </div>


        <!-- 新增弹窗 -->
        <el-dialog
            title="新增计划"
            :visible.sync="addPlanManagedialogVisible"
            width="450px"
            :modal-append-to-body="false">
            <el-form ref="addForm" :rules="addRules" status-icon :model="addForm" label-width="105px" class="demo-ruleForm">
                <el-form-item label="雾炮启动时间" prop="wpStartTime">
                    <el-date-picker
                        style="width:200px"
                        v-model="addForm.wpStartTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="持续时间" prop="cxMin">
                    <el-input v-model="addForm.cxMin"  style="width:200px"></el-input>分钟
                </el-form-item>
                <el-form-item label="包含的料棚" prop="areaIds">
                    <el-checkbox-group v-model="addForm.areaIds"  style="width:200px">
                        <el-checkbox :label="item.areaId"  :key="item.areaId" v-for="item in areaInDoor">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="addForm.checkStatus" style="width:200px">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="未通过" value="-1"></el-option>
                        <el-option label="通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAddPlanManageFrom('addForm')">立即提交</el-button>
                    <!--<el-button @click="handleClose('addForm')">取消</el-button>-->
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 审核弹窗 -->
        <el-dialog
            title="审核通知"
            :visible.sync="auditPlanManagedialogVisible"
            width="450px"
            :modal-append-to-body="false">
            <el-form ref="auditForm" :rules="auditRules" status-icon :model="auditForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="计划ID" >
                    <el-input v-model="auditForm.planId" style="width:200px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="审核状态" >
                    <el-select v-model="auditForm.checkStatus" style="width:200px">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="未通过" value="-1"></el-option>
                        <el-option label="通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核信息描述状态" prop="checkMsg">
                    <textarea style="width: 300px;height: 100px;border-color: #dedede;" v-model="auditForm.checkMsg" maxlength="100" placeholder="请输入审核信息描述状态(100字以内)" ></textarea>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitAuditPlanManageFrom('auditForm')">立即提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '../../common/unit/Pagination'
    import tableToExcel  from '../../common/unit/exportExeclUtil'
    import tableToCsv  from '../../common/unit/exportCsvUtil'
    import bw_encrypt from '../../common/unit/BwEncrypt'
    export default {
        components:{
            pagination
        },
        name: "planManage",
        data(){
            var wpStartTime = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择雾炮启动时间'));
                } else {
                    callback();
                }
            };
            var cxMin = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入持续时间(分)'));
                } else if(!/^[1-9]\d*$/.test(value)){
                    callback(new Error('请输入正整数(分)'));
                } else {
                    callback();
                }
            };
            var areaIds = (rule, value, callback) => {
                if (String(value)==='') {
                    callback(new Error('请至少选择一项包含的料棚'));
                } else {
                    callback();
                }
            };
            var checkMsg = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入审核信息描述状态'));
                } else {
                    callback();
                }
            };
            return {
                printObj: {
                    id: "print",
                    popTitle: '用户列表',
                    //extraCss: 'https://www.google.com,https://www.google.com',
                    extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
                },
                addPlanManagedialogVisible:false,
                auditPlanManagedialogVisible:false,
                tableData:[

                ],
                colData: [
                    {title: "计划ID",istrue: true},
                   {title: "来源",istrue: true},
                   {title: "雾炮启动时间",istrue: true},
                    {title: "雾炮停止时间",istrue: true},
                    {title: "审核状态",istrue: true},
                    {title: "审核状态描述",istrue: true},
                    {title: "执行结果",istrue: true},
                    {title: "执行结果描述",istrue: true},
                    {title: "处理区域",istrue: true},
                    {title: "创建时间",istrue: true}
                ],
                colOptions: [
                    "计划ID","来源","雾炮启动时间","雾炮停止时间","审核状态","审核状态描述","执行结果","执行结果描述","处理区域","创建时间"
                ], //默认全选
                colSelect: [
                    "计划ID","来源","雾炮启动时间","雾炮停止时间","审核状态","审核状态描述","执行结果","执行结果描述","处理区域","创建时间"
                ],
                addForm:{
                    wpStartTime:'',
                    cxMin:60,
                    areaIds:[],
                    checkStatus:'0'
                },

                auditForm:{
                    planId:'',
                    checkStatus:'',
                    checkMsg:''
                },
                addRules: {
                    wpStartTime:[
                        { validator: wpStartTime, trigger: 'change' }
                    ],
                    cxMin:[
                        {validator: cxMin, trigger: 'blur' }
                    ],
                    areaIds:[
                        { validator: areaIds, trigger: 'change' }
                    ],
                },
                auditRules:{
                    checkMsg: [
                        /*{ required: true, message: '请输入用户名', trigger: 'blur' }*/
                        {validator: checkMsg, trigger: 'blur' }
                    ],
                },
                examineOptions:[
                    {
                        value: '',
                        label: '不限'
                    }, {
                        value: '0',
                        label: '待审核'
                    }, {
                        value: '-1',
                        label: '未通过'
                    }, {
                        value: '1',
                        label: '通过'
                    }
                ],
                execResultOptions:[
                    {
                        value: '',
                        label: '不限'
                    }, {
                        value: '0',
                        label: '未执行'
                    }, {
                        value: '-1',
                        label: '取消或失败'
                    }, {
                        value: '1',
                        label: '执行完成'
                    }, {
                        value: '2',
                        label: '执行中'
                    }
                ],
                orderByOptions:[
                    {
                        value: '2',
                        label: '时间倒序'
                    }, {
                        value: '1',
                        label: '时间正序'
                    }
                ],
                search:{
                    examineStatus:'',
                    execResult:'',
                    orderByType:'2'
                },
                areaInDoor:[]
            }
        },
        watch: {
            colOptions(valArr) {
                var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
                this.colData.filter(i => {
                    if (arr.indexOf(i.title) != -1) {
                        i.istrue = false;
                        this.$nextTick(() => {
                             this.$refs.tableDataRef.doLayout();
                           });
                        } else {
                        i.istrue = true;
                        this.$nextTick(() => {
                             this.$refs.tableDataRef.doLayout();
                        });
                    }
                });
            }
        },
        mounted: function () {
            this.pageList();
        },
        methods: {
            paginationFunction() {
                this.pageList();
            },
            getIndex(index) {
                let curPage = this.$refs.paginationObj.cur_page;
                let limitPage = this.$refs.paginationObj.cur_pageSize;
                return (index + 1) + (curPage - 1) * limitPage;
            },
            pageList() {
                let _this = this;
                let params = {
                    pageNo: _this.$refs.paginationObj.cur_page,
                    pageSize: _this.$refs.paginationObj.cur_pageSize,
                    startTime: '',
                    endTime: '',
                    checkStatus: _this.search.examineStatus,
                    execResult: _this.search.execResult,
                    orderType: _this.search.orderByType,
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/r/getPlan", params).then(function (data) {
                    if (data.code == 0) {
                        _this.tableData = data.data.data;
                        _this.$refs.paginationObj.count = data.data.total;
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            auditPlanManage(row) {
                this.auditForm.planId = row.planId;
                this.auditForm.checkStatus = row.checkStatus+'';
                this.auditPlanManagedialogVisible = true;
            },

            addPlanManage() {
                this.getAreaInDoor();
                this.addPlanManagedialogVisible = true;
            },
            handleClose(formName) {
                this.addPlanManagedialogVisible = false;
                this.initAddFrom();
                this.$refs[formName].resetFields();
            },
            handleAuditClose(formName){
                this.auditPlanManagedialogVisible = false;
                this.initAuditFrom();
                this.$refs[formName].resetFields();
            },
            exportTableData(type) {
                var tableData = this.tableData;
                var colOptions = this.colOptions;
                if (colOptions.length < 1) {
                    this.$message.warning("至少选择一列!");
                    return;
                }
                if (tableData.length < 1) {
                    this.$message.warning("暂无数据!");
                    return;
                }
                var data = [];
                var columns = [];
                //"用户名","登陆账号", "用户类别"
                for (let i = 0; i < tableData.length; i++) {
                    var obj = {};
                    //obj.index = i+1;
                    if (colOptions.includes("计划ID")) {
                        obj.planId = tableData[i].planId;
                    }
                    if (colOptions.includes("来源")) {
                        obj.srcModule = tableData[i].srcModule;
                    }
                    if (colOptions.includes("雾炮启动时间")) {
                        obj.startTime = tableData[i].startTime;
                    }
                    if (colOptions.includes("雾炮停止时间")) {
                        obj.endTime = tableData[i].endTime;
                    }
                    if (colOptions.includes("审核状态")) {
                        obj.checkStatus = this.checkStatusStr(tableData[i].checkStatus);
                    }
                    if (colOptions.includes("审核状态描述")) {
                        obj.checkMsg = tableData[i].checkMsg==null?'':tableData[i].checkMsg;
                    }
                    if (colOptions.includes("执行结果")) {
                        obj.result = this.resultStr(tableData[i].result);
                    }
                    if (colOptions.includes("执行结果描述")) {
                        obj.resultMsg = tableData[i].resultMsg==null?'':tableData[i].resultMsg;
                    }
                    if (colOptions.includes("处理区域")) {
                        let str = String(tableData[i].areas);
                        if("Execl" == type){
                            obj.areas = str
                        }else if("Csv" == type){
                            obj.areas = this.cvsSymbolChange(str);
                        }
                    }
                    if (colOptions.includes("创建时间")) {
                        obj.createTime = tableData[i].createTime;
                    }
                    data.push(obj);
                }
                for (let i = 0; i < colOptions.length; i++) {
                    var obj = {};
                    obj.title = colOptions[i];
                    columns.push(obj);
                }
                if ("Execl" == type) {
                    tableToExcel(columns, data, "抑尘计划列表");
                } else if ("Csv" == type) {
                    tableToCsv(columns, data, "抑尘计划列表");
                }
            },
            submitAddPlanManageFrom(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交
                        this.savePlanManage(formName);
                    } else {
                        return false;
                    }
                });
            },
            submitAuditPlanManageFrom(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交
                        this.upPlanManage(formName);
                    } else {
                        return false;
                    }
                });
            },
            savePlanManage(formName) {
                let _this = this;
                let params = {
                    startTime: _this.addForm.wpStartTime,
                    keepTime: _this.addForm.cxMin,
                    areaList: String(_this.addForm.areaIds),
                    checkStatus: _this.addForm.checkStatus,
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/c/addPlan", params).then(function (data) {
                    if (data.code == 0) {
                        _this.$message.success("计划新增成功");
                        _this.pageList();
                        _this.handleClose(formName);
                    } else {
                        _this.$message.warning(data.msg);
                    }
                }).catch(function (err) {
                    _this.$message.error("计划新增失败");
                    console.log(err);
                })
            },
            upPlanManage(formName){
                let _this = this;
                let params = {
                    planId: _this.auditForm.planId,
                    checkStatus: _this.auditForm.checkStatus,
                    checkMsg: _this.auditForm.checkMsg,
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/poll/u/checkPlan", params).then(function (data) {
                    if (data.code == 0) {
                        _this.$message.success("提交成功");
                        _this.pageList();
                        _this.handleAuditClose(formName);
                    } else {
                        _this.$message.warning(data.msg);
                    }
                }).catch(function (err) {
                    _this.$message.error("提交失败");
                    console.log(err);
                })
            },
            prints: function () {
                var tableData = this.tableData;
                var colOptions = this.colOptions;
                if (colOptions.length < 1) {
                    this.$message.warning("至少选择一列!");
                    return;
                }
                if (tableData.length < 1) {
                    this.$message.warning("暂无数据!");
                    return;
                }
                // 调用打印js
                this.$print(
                    this.$print(this.$refs.print) // 使用
                )
            },
            initAddFrom() {
                this.addForm.wpStartTime='';
                this.addForm.cxMin=60;
                this.addForm.areaIds=[];
                this.addForm.checkStatus='0';
            },
            initAuditFrom(){
                this.auditForm.planId = "";
                this.auditForm.checkStatus = "";
                this.auditForm.checkMsg = "";
            },
            // 请求新增计划弹窗包含料棚项
            getAreaInDoor(){
                let _this = this;
                let params = {
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/pub/r/getAreaInDoor", params).then(function (data) {
                    if (data.code == 0) {
                        _this.areaInDoor = data.data;
                    } else {
                        _this.$message.warning(data.msg);
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            checkStatusStr(checkStatus){
                var str = '';
                if(checkStatus==0){
                    str = "待审核"
                }else if(checkStatus<0){
                    str = "未通过"
                }else if(checkStatus==1){
                    str = "通过"
                }
                return str;
            },
            resultStr(result){
                var str = '';
                if(result==0){
                    str = "未执行"
                }else if(result<0){
                    str = "取消或失败"
                }else if(result==1){
                    str = "执行完成"
                }else if(result==2){
                    str = "执行中"
                }
                return str;
            },
            cvsSymbolChange(str){
                if(str.search(",")){
                    //如果还有双引号，先将双引号转义，避免两边加了双引号后转义错误
                    if(str.search("\"")){
                        str=str.replace("\"", "\"\"");
                    }
                    //将逗号转义
                    str="\""+str+"\"";
                }
                return str;
            }
        }
    }
</script>

<style>
</style>
