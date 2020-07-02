<template>
    <div class="main">
        <div class="main-top" style="margin-top: 15px">
            <div class="breadcrumb" style="background-color: #ffffff;padding:10px 30px 20px">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>设备监控</a><span class="sep">&gt;</span><span
                class="text-primary">设备浏览</span>
            </div>
        </div>
        <div style="height: 100px;background-color: #ffffff;padding:20px 30px 30px;margin-top: 15px">
            <div style="height: 35px">
                <div style="width: 5px;height: 18px;background-color: #157edb;float: left"></div>
                <div style="float: left;margin-left: 10px; ">查询条件</div>
            </div>
            <el-form :inline="true" :model="formInline">
                <el-form-item label="设备类别: ">
                    <el-select v-model="formInline.subType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备ID: ">
                    <el-input v-model="formInline.deviceId" placeholder="优先级最高">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="searchInit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                <el-table-column prop="deviceId"  label="设备ID"  ></el-table-column>
                <el-table-column prop="oriDeviceId"  label="设备原始ID"  ></el-table-column>
                <el-table-column prop="name"  label="设备名称"></el-table-column>
                <el-table-column prop="subTypeName"  label="设备类型" ></el-table-column>
                <el-table-column prop="coordX"  label="X坐标（厂区图）"  ></el-table-column>
                <el-table-column prop="coordY"  label="Y坐标（厂区图）"  ></el-table-column>
                <el-table-column label="操作"  width="180">
                    <template slot-scope="solt">
                        <el-button type="primary" @click="openDialog(solt.row)" >编辑</el-button>
                        <el-button type="primary" v-show="solt.row.subType=='DST'" @click="openDialogWu(solt.row)" >关联雾炮</el-button>
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
            <el-dialog title="编辑" append-to-body  :visible.sync="dialogFormVisible" width="35%" @close="closeDialog">
                <el-form :model="formUpdate" :rules="rulesForm" ref="formName">
                    <el-form-item label="设备类型" :label-width="formLabelWidth">
                       {{formUpdate.subTypeName}}
                    </el-form-item>
                    <el-form-item label="设备ID" :label-width="formLabelWidth">
                       {{formUpdate.deviceId}}
                    </el-form-item>
                    <el-form-item label="设备原始ID" :label-width="formLabelWidth" prop="oriDeviceId">
                        <el-input v-model="formUpdate.oriDeviceId" style="width: 220px"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="formUpdate.name" style="width: 220px"></el-input>
                    </el-form-item>
                    <el-form-item label="厂区图X坐标" :label-width="formLabelWidth" prop="coordX">
                        <el-input v-model="formUpdate.coordX" style="width: 220px"></el-input><span>取值：0~1302</span>
                    </el-form-item>
                    <el-form-item label="厂区图Y坐标" :label-width="formLabelWidth" prop="coordY">
                        <el-input v-model="formUpdate.coordY" style="width: 220px"></el-input><span>取值：0~510</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="updateData()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!--弹框  2 -->
        <div>
            <el-dialog title="关联雾炮" append-to-body  :visible.sync="dialogFormVisibleWu" width="35%" @close="closeDialogWu">
                <el-form :model="formUpdate">
                    <el-form-item label="启用关联" :label-width="formLabelWidth">
                        <el-switch @change="switchChange"
                            v-model="state"
                            active-color="#13ce66"
                            inactive-color="#d2d2d2">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="粉尘设备" :label-width="formLabelWidth">
                        <el-input v-model="formUpdateWu.name" style="width: 220px"></el-input>
                    </el-form-item>
                    <el-form-item label="关联雾炮设备" :label-width="formLabelWidth">
                        <el-select v-model="formUpdateWu.fggDeviceId" placeholder="请选择" :disabled="stateDis">
                            <el-option
                                v-for="item in deviceNameArr"
                                :key="item.deviceId"
                                :label="item.name"
                                :value="item.deviceId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="水平角度-开始" :label-width="formLabelWidth">
                        <el-input v-model="formUpdateWu.angleH" style="width: 220px" :disabled="stateDis"></el-input>
                    </el-form-item>
                    <el-form-item label="水平角度-结束" :label-width="formLabelWidth">
                        <el-input v-model="formUpdateWu.angleH2" style="width: 220px" :disabled="stateDis"></el-input>
                    </el-form-item>
                    <el-form-item label="垂直角度" :label-width="formLabelWidth">
                        <el-input v-model="formUpdateWu.angleV" style="width: 220px;" :disabled="stateDis"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                    <el-button @click="closeDialogWu">取 消</el-button>
                    <el-button type="primary" @click="diaoText()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Pagination from '../../../components/common/unit/Pagination'
    export default {
        name: "devLook",
        components:{
            Pagination
        },
        data() {
            var checkAgeCodex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入坐标'));
                } else if (value <0||value>1302) {
                    callback(new Error('请输入坐标指定范围!'));
                } else {
                    callback();
                }
            };
            var checkAgeCodey = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入坐标'));
                } else if (value <0||value>510) {
                    callback(new Error('请输入坐标指定范围!'));
                } else {
                    callback();
                }
            };
            return {
                formInline: {
                    subType: '',
                    deviceId: ''
                },
                options: [
                    {value: '', name: '全部'},
                    {value: 'DST', name: '粉尘监测设备'},
                    {value: 'AIR', name: '空气监测设备'},
                    {value: 'POL', name: 'VOC监测设备'},
                    {value: 'WAT', name: '水表'},
                    {value: 'ELT', name: '电表'},
                    {value: 'REC', name: '录像机'},
                    {value: 'CAM', name: '摄像头'},
                    {value: 'FGG', name: '雾炮'},
                    {value: 'FGM', name: '干雾主机'},
                    {value: 'FGC', name: '雾帘'},
                ],
                tableData:[],
                dialogFormVisible: false,
                dialogFormVisibleWu: false,
                formUpdate: {
                    deviceId: '',
                    oriDeviceId: '',
                    name: '',
                    coordX: '',
                    coordY: '',
                    subTypeName: '',
                    vv: Math.random()
                },
                formUpdateWu: {
                    deviceId: '',
                    oriDeviceId: '',
                    name: '',
                    coordX: '',
                    coordY: '',
                    subTypeName: '',
                    fggDeviceId: '',
                    angleH: '',
                    angleH2: '',
                    angleV: '',
                    subType:'',
                    vv: Math.random()
                },
                formLabelWidth: '120px',
                state:true,
                stateDis:true,
                deviceNameArr:[],
                rulesForm:{
                    coordX:[ { required: true, message: '请输入坐标', trigger: 'blur' },
                        {validator: checkAgeCodex}],
                    coordY:[ { required: true, message: '请输入坐标', trigger: 'blur' },
                        {validator: checkAgeCodey}],
                    oriDeviceId:[ { required: true, message: '请输入设备原始ID', trigger: 'blur' },],
                    name:[ { required: true, message: '请输入设备名称', trigger: 'blur' },]
                }
            }

        },
        mounted(){
            this.initPage();
        },
        methods: {
            paginationFunction() {
                this.initPage();
            },
            getIndex(index){
                let curPage = this.$refs.paginationObj.cur_page;
                let limitPage = this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            initPagination: function (pageNo, pageSize, array) {
                var offset = (pageNo - 1) * pageSize;
                return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
            },
            switchChange: function (data) {
                if (data == true) {
                    this.stateDis = false;
                    this.getInfoAndCondById();
                } else {
                    this.stateDis = true;
                    this.formUpdateWu.angleH = "";
                    this.formUpdateWu.angleH2 = "";
                    this.formUpdateWu.angleV = "";
                    this.formUpdateWu.fggDeviceId = "";
                }
            },
            getInfoAndCondById: function () {
                let _this = this;
                let params2 = {
                    deviceId: _this.formUpdateWu.deviceId,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/device/r/getInfoAndCondById", params2).then(function (data) {
                    if (data.code == 0) {
                        _this.formUpdateWu.angleH = data.data.info.otherAttr.fggAngleH;
                        _this.formUpdateWu.angleH2 = data.data.info.otherAttr.fggAngleH2;
                        _this.formUpdateWu.angleV = data.data.info.otherAttr.fggAngleV;
                        _this.formUpdateWu.fggDeviceId = data.data.info.otherAttr.fggDeviceId;
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            diaoText: function () {
                let _this=this;
                if (_this.state == true) {
                    _this.updateDataWu();
                } else {
                    _this.$confirm('确定要取消当前粉尘监测设备（' + _this.formUpdateWu.deviceId + '）关联的雾炮吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        _this.updateDataWu();
                    }).catch(function () {

                    })
                }

            },
            updateDataWu: function () {
                let _this = this;
                let f = _this.formUpdateWu;
                let params2 = {
                    deviceId: f.deviceId,
                    fggDeviceId: f.fggDeviceId,
                    angleH: f.angleH,
                    angleH2: f.angleH2,
                    angleV: f.angleV,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_dev/u/updLinkedFgg", params2).then(function (data) {

                    if (data.code == 0) {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.closeDialogWu();
                        _this.initPage();
                    } else {
                        _this.$message(data.msg);
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            updateData: function () {
                let _this = this;
                let f = _this.formUpdate;
                let params2 = {
                    deviceId: f.deviceId,
                    oriDeviceId: f.oriDeviceId,
                    name: f.name,
                    coordX: f.coordX,
                    coordY: f.coordY,
                    vv: Math.random()
                };
                _this.$refs['formName'].validate((valid) => {
                    if (valid) {
                        //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                        _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_dev/u/updDevInfo", params2).then(function (data) {

                            if (data.code == 0) {
                                _this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                _this.closeDialog();
                                _this.initPage();
                            } else {
                                _this.$message(data.msg);
                            }
                        }).catch(function (err) {
                            console.log(err);
                        })
                    }
                })

            },
            closeDialog: function () {
                this.dialogFormVisible = false;
                this.$refs['formName'].resetFields();
                // this.formUpdate.coordX='';
                // this.formUpdate.coordY='';
                // this.formUpdate.name='';
                // this.formUpdate.deviceId='';
                // this.formUpdate.oriDeviceId='';
            },
            closeDialogWu: function () {
                this.dialogFormVisibleWu = false;
            },
            openDialog: function (row) {
                this.formUpdate = row;
                this.dialogFormVisible = true;
            },
            openDialogWu: function (row) {
                this.getDeviInfo();
                if (row.otherAttr.fggDeviceId == null || row.otherAttr.fggDeviceId == '') {
                    this.state = false;
                    this.stateDis = true;
                    this.formUpdateWu.deviceId = row.deviceId;
                    this.formUpdateWu.name = row.name;
                    this.formUpdateWu.subType = row.subType;
                    this.formUpdateWu.fggDeviceId = row.otherAttr.fggDeviceId;
                } else {
                    this.state = true;
                    this.stateDis = false;
                    this.formUpdateWu.deviceId = row.deviceId;
                    this.formUpdateWu.name = row.name;
                    this.formUpdateWu.angleH = row.otherAttr.fggAngleH;
                    this.formUpdateWu.angleH2 = row.otherAttr.fggAngleH2;
                    this.formUpdateWu.angleV = row.otherAttr.fggAngleV;
                    this.formUpdateWu.subType = row.subType;
                    this.formUpdateWu.fggDeviceId = row.otherAttr.fggDeviceId;
                }
                this.dialogFormVisibleWu = true;
            },

            searchInit: function () {
                this.initPage();
            },
            initPage: function () {
                let _this = this;
              let  pageNo=_this.$refs.paginationObj.cur_page;
              let   pageSize=_this.$refs.paginationObj.cur_pageSize;
                let params2 = {
                    subType: this.formInline.subType,
                    deviceId: this.formInline.deviceId,
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/mng_dev/r/getDevInfo", params2).then(function (data) {
                    if (data.code == 0) {
                        if(data.data.length>0){
                            _this.$refs.paginationObj.count=data.data.length;
                            _this.tableData = _this.initPagination(pageNo,pageSize,data.data);
                        }
                    }

                }).catch(function (err) {
                    console.log(err);
                })
            },
            getDeviInfo: function () {
                let _this = this;
                let params2 = {
                    subType: 'FGG',
                    vv: Math.random()
                };
                //http://10.0.200.131:8020/gkz-service/d/mng_dev/r/getDevInfo
                _this.ajaxUtil.sendGet(_this.AppConfig.gkzApi + "/device/r/getInfo", params2).then(function (data) {
                    if (data.code == 0) {
                        _this.deviceNameArr = data.data;
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>
