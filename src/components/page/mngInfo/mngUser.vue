<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>系统管理</a><span class="sep">&gt;</span><span
                class="text-primary">用户管理</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd" >
                <!-- header -->
                <div>
                    <div style="float: left">
                        <el-button type="primary" @click="addUser">新增用户</el-button>
                        <el-button type="primary" @click="pageList">查询</el-button>
                    </div>
                    <div style="float: right">
                        <el-popover
                            placement="bottom-start"
                            width="100"
                            trigger="click">
                            <el-checkbox-group v-model="colOptions">
                                <el-checkbox label="用户名"></el-checkbox>
                                <el-checkbox label="登陆账号"></el-checkbox>
                                <el-checkbox label="用户类别"></el-checkbox>
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
                        <el-table-column v-if="colData[0].istrue" prop="name" label="用户名" align="center"></el-table-column>
                        <el-table-column v-if="colData[1].istrue" prop="loginName" label="登陆账号" align="center"></el-table-column>
                        <el-table-column v-if="colData[2].istrue" prop="type" label="用户类别" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == 0" >普通用户</span>
                                <span v-if="scope.row.type == 1" >管理员</span>
                            </template>
                        </el-table-column>
                        <el-table-column  width="150"  label="操作" align="center">
                            <template slot-scope="scope">
                                <el-link size="small" type="primary"
                                         @click="editUser(scope.row)"
                                >编辑
                                </el-link>
                                <el-link size="small" type="primary"
                                         @click="delUser(scope.row)"
                                >删除
                                </el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div  style="display: none">
                    <div ref="print">
                        <el-table :data="tableData" style="width: 100%" >
                            <el-table-column
                                type="index"
                                label="序号" :index="getIndex" align="center" width="80">
                            </el-table-column>
                            <el-table-column v-if="colData[0].istrue" prop="name" label="用户名" align="center" width="225"></el-table-column>
                            <el-table-column v-if="colData[1].istrue" prop="loginName" label="登陆账号" align="center" width="225"></el-table-column>
                            <el-table-column v-if="colData[2].istrue" prop="type" label="用户类别" align="center" width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type == 0" >普通用户</span>
                                    <span v-if="scope.row.type == 1" >管理员</span>
                                </template>
                            </el-table-column>
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
            title="新增用户"
            :visible.sync="addUserdialogVisible"
            width="480px"
            :modal-append-to-body="false">
            <el-form ref="addForm" :rules="addRules" status-icon :model="addForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addForm.name" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="登录名" prop="loginName">
                    <el-input v-model="addForm.loginName" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="type">
                    <el-select v-model="addForm.type" placeholder="类别" style="width:200px">
                        <el-option label="普通用户" value="0"></el-option>
                        <el-option label="管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="addForm.pwd" style="width:200px"></el-input>
                    <span>密码必须3到16位之间</span>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwd2">
                    <el-input v-model="addForm.pwd2" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAddUserFrom('addForm')">确定</el-button>
                    <el-button @click="handleClose('addForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog
            title="更新用户信息"
            :visible.sync="upUserdialogVisible"
            width="480px"
            :modal-append-to-body="false">
            <el-form ref="upForm" :rules="upRules" status-icon :model="upForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="用户ID" >
                    <el-input v-model="upForm.userId" style="width:200px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="登录名" >
                    <el-input v-model="upForm.loginName" style="width:200px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="upForm.name" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pwd">
                    <el-input v-model="upForm.pwd" style="width:200px"></el-input>
                    <span>密码必须3到16位之间</span>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwd2">
                    <el-input v-model="upForm.pwd2" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitUpUserFrom('upForm')">确定</el-button>
                    <el-button @click="handleUpClose('upForm')">取消</el-button>
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
        name: "mngUser",
        data(){
            var userName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                    callback(new Error('用户名不能有特殊字符'));
                } else if(/(^\_)|(\__)|(\_+$)/.test(value)){
                    callback(new Error('用户名首尾不能出现下划线\'_\''));
                } else {
                    callback();
                }
            };
            var loginName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录名'));
                } else if(!/^[a-zA-Z0-9_-]{4,16}$/.test(value)){
                    callback(new Error('4到16位（可以使用字母，数字，下划线，减号）'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!/^[\S]{3,16}$/.test(value)){
                    callback(new Error('密码必须3到16位，且不能出现空格'));
                }else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass2Up = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.upForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
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
                addUserdialogVisible:false,
                upUserdialogVisible:false,
                tableData:[
                    /*{userId:1,name:'卫庄',loginName:'weizhuang',type:0}*/
                ],
                colData: [
                    {title: "用户名",istrue: true},
                    {title: "登陆账号",istrue: true},
                    {title: "用户类别",istrue: true},
                ],
                colOptions: ["用户名","登陆账号", "用户类别"], //默认全选
                colSelect: ["用户名", "登陆账号","用户类别"],
                addForm:{
                    name: '',
                    loginName: '',
                    type: '0',
                    pwd: '',
                    pwd2: '',
                },
                upForm:{
                    userId:'',
                    name: '',
                    loginName: '',
                    pwd: '',
                    pwd2: '',
                },
                addRules: {
                    name: [
                        /*{ required: true, message: '请输入用户名', trigger: 'blur' }*/
                        {validator: userName, trigger: 'blur' }
                    ],
                    loginName: [
                        /*{ required: true, message: '请输入登录名', trigger: 'blur' }*/
                        {validator: loginName, trigger: 'blur' }
                    ],
                    type: [
                        /*{ required: true, message: '请至少选择一个用户类别', trigger: 'change' }*/
                        /*{ validator: userType, trigger: 'change' }*/
                    ],
                    pwd: [
                        /*{ required: true, message: '请输入密码', trigger: 'blur' }*/
                        {validator: validatePass, trigger: 'blur' }
                    ],
                    pwd2: [
                        /*{  required: true, message: '请输入确认密码', trigger: 'blur' }*/
                        {validator: validatePass2, trigger: 'blur' }
                    ]
                },
                upRules:{
                    name: [
                        /*{ required: true, message: '请输入用户名', trigger: 'blur' }*/
                        {validator: userName, trigger: 'blur' }
                    ],
                    pwd: [
                        /*{ required: true, message: '请输入密码', trigger: 'blur' }*/
                        {validator: validatePass, trigger: 'blur' }
                    ],
                    pwd2: [
                        /*{  required: true, message: '请输入确认密码', trigger: 'blur' }*/
                        {validator: validatePass2Up, trigger: 'blur' }
                    ]
                },
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
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_user/r/getUserInfo", params).then(function (data) {
                    if (data.code == 0) {
                        _this.tableData = data.data.data;
                        _this.$refs.paginationObj.count = data.data.total;
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            editUser(row) {
                this.upForm.userId = row.userId;
                this.upForm.loginName = row.loginName;
                this.upForm.name = row.name;
                this.upUserdialogVisible = true;
            },
            delUser(row) {
                this.$confirm('确定要删除('+row.name+')吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delUserInfo(row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addUser() {
                this.addUserdialogVisible = true;
            },
            handleClose(formName) {
                this.addUserdialogVisible = false;
                this.initAddFrom();
                this.$refs[formName].resetFields();
            },
            handleUpClose(formName){
                this.upUserdialogVisible = false;
                this.initUpFrom();
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
                    if (colOptions.includes("用户名")) {
                        obj.name = tableData[i].name;
                    }
                    if (colOptions.includes("登陆账号")) {
                        obj.loginName = tableData[i].loginName;
                    }
                    if (colOptions.includes("用户类别")) {
                        if (tableData[i].type == 0) {
                            obj.type = "普通用户";
                        } else if (tableData[i].type == 1) {
                            obj.type = "管理员";
                        }
                    }
                    data.push(obj);
                }
                for (let i = 0; i < colOptions.length; i++) {
                    var obj = {};
                    obj.title = colOptions[i];
                    columns.push(obj);
                }
                if ("Execl" == type) {
                    tableToExcel(columns, data, "用户列表");
                } else if ("Csv" == type) {
                    tableToCsv(columns, data, "用户列表");
                }
            },
            submitAddUserFrom(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交
                        this.saveUser(formName);
                    } else {
                        return false;
                    }
                });
            },
            submitUpUserFrom(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交
                        this.updateUser(formName);
                    } else {
                        return false;
                    }
                });
            },
            saveUser(formName) {
                let _this = this;
                let params = {
                    name: _this.addForm.name,
                    loginName: _this.addForm.loginName,
                    type: _this.addForm.type,
                    password: bw_encrypt(_this.addForm.pwd),
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_user/c/addUser", params).then(function (data) {
                    if (data.code == 0) {
                        _this.$message.success("用户新增成功");
                        _this.pageList();
                        _this.handleClose(formName);
                    } else {
                        _this.$message.warning(data.msg);
                    }
                }).catch(function (err) {
                    _this.$message.error("用户新增失败");
                    console.log(err);
                })
            },
            updateUser(formName){
                let _this = this;
                let params = {
                    userId: _this.upForm.userId,
                    name: _this.upForm.name,
                    password: bw_encrypt(_this.upForm.pwd),
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_user/u/updUserInfo", params).then(function (data) {
                    if (data.code == 0) {
                        _this.$message.success("用户信息更新成功");
                        _this.pageList();
                        _this.handleUpClose(formName);
                    } else {
                        _this.$message.warning(data.msg);
                    }
                }).catch(function (err) {
                    _this.$message.error("用户信息更新失败");
                    console.log(err);
                })
            },
            delUserInfo(userInfo){
                let _this = this;
                let params = {
                    userId: userInfo.userId,
                    vv: Math.random()
                };
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_user/d/delUser", params).then(function (data) {
                    if (data.code == 0) {
                        _this.$message.success("用户信息删除成功");
                        _this.$refs.paginationObj.cur_page = 1;
                        _this.pageList();
                    } else {
                        _this.$message.warning(data.msg);
                    }
                }).catch(function (err) {
                    _this.$message.error("用户信息删除失败");
                    console.log(err);
                })
            },
            prints () {
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
                this.addForm.name = "";
                this.addForm.loginName = "";
                this.addForm.type = "0";
                this.addForm.pwd = "";
                this.addForm.pwd2 = "";
            },
            initUpFrom(){
                this.upForm.userId = "";
                this.upForm.name = "";
                this.upForm.loginName = "";
                this.upForm.pwd = "";
                this.upForm.pwd2 = "";
            }
        }
    }
</script>

<style>
</style>
