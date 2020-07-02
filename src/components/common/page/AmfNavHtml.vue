<template>
    <!-- 导航 -->
    <div class="nav">
        <ul class="nav-list">
            <li><i class="icon icon-zonghekanban"></i><span>监控中心</span></li>
            <li class="is-active">
                <i class="icon icon-shishijiance"></i><span>视频墙</span>
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <!--<dt>信息管理</dt>-->
                        <!--<dd>站点管理</dd>-->
                        <!--<dd>区域管理</dd>-->
                        <!--<dd>视频管理</dd>-->
                        <!--<dd>单位管理</dd>-->
                        <!--<dd>设备类型</dd>-->
                        <!--<dd>设备报警码</dd>-->
                        <router-link to="realTimeInfoHtml">
                            <dd>实时一览</dd>
                        </router-link>
                    </dl>
                    <!--<dl class="list-sub-item">-->
                        <!--<dt>因子与标准</dt>-->
                        <!--<dd>监测因子</dd>-->
                        <!--<dd>监测因子组</dd>-->
                        <!--<dd>空气质量标准</dd>-->
                        <!--<dd>雾霾标准</dd>-->
                    <!--</dl>-->
                    <!--<dl class="list-sub-item">-->
                        <!--<dt>系统配置</dt>-->
                        <!--<dd>状态配置</dd>-->
                        <!--<dd>报警配置</dd>-->
                        <!--<dd>审核配置</dd>-->
                        <!--<dd>通知配置</dd>-->
                        <!--<dd>基础配置</dd>-->
                        <!--<dd>功能配置</dd>-->
                    <!--</dl>-->
                </div>
            </li>
            <li>
                <i class="icon icon-shujuguanli"></i><span>设备监控</span>
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <dt>数据审核</dt>
                        <router-link to="dataAuditFirst" ><dd>一级审核</dd></router-link>
                        <router-link to="dataAuditReview" ><dd>二级审核</dd></router-link>
                        <router-link to="dataAuditFirst" ><dd>审核日志</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>数据补录</dt>
                        <router-link to="historyData" ><dd>手工补录</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>数据查询</dt>
                        <router-link to="historyData" ><dd>历史数据</dd></router-link>
                    </dl>
                </div>
            </li>
            <li class="is-active">
                <i class="icon icon-baojingguanli"></i><span>数据浏览</span>
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <router-link to="alarmData">
                            <dd>数据报警查询</dd>
                        </router-link>
                        <router-link to="alarmStatistics">
                            <dd>数据报警统计</dd>
                        </router-link>
                        <router-link to="alarmSection">
                            <dd>未达标查询</dd>
                        </router-link>
                        <router-link to="alarmWaterQuality">
                            <dd>水质变差查询</dd>
                        </router-link>
                    </dl>
                </div>
            </li>
            <li>
                <i class="icon icon-baobiaozhongxin"></i><span>统计分析</span>
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <dt>粉尘检测</dt>
                        <router-link to="polluteTherm" ><dd>污染热力图</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>空气检测</dt>
                        <router-link to="airPolluteTherm" ><dd>污染热力图</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>VOC检测</dt>
                        <router-link to="vocPolluteTherm" ><dd>污染热力图</dd></router-link>
                    </dl>
                </div>
            </li>
            <li><i class="icon icon-tongjifenxi"></i><span>污染管控</span>
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <dt>粉尘监测</dt>
                        <router-link to="realRanking" ><dd>粉尘实时排名</dd></router-link>
                        <router-link to="hisRanking" ><dd>粉尘历史排名</dd></router-link>
                        <router-link to="comparison" ><dd>粉尘对比分析</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>空气监测</dt>
                        <router-link to="airRealRanking" ><dd>空气实时排名</dd></router-link>
                        <router-link to="airHisRanking" ><dd>空气历史排名</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>VOC监测</dt>
                        <router-link to="vocRealRanking" ><dd>VOC实时排名</dd></router-link>
                        <router-link to="vocHisRanking" ><dd>VOC历史排名</dd></router-link>
                    </dl>
                </div>
            </li>
          <!--  <li><i class="icon icon-yuanchengjiankong"></i><span>远程监控</span></li>-->
            <li><i class="icon icon-xinxiguanli"></i><span>设备管理</span>
         <!--   <li class="is-active">-->
              <!--  <i class="icon icon-shishijiance"></i><span>基础信息</span>-->
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <dt> 空气监测</dt>
                        <router-link to="airPollutionTrend" ><dd>污染变化趋势</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>粉尘检测</dt>
                        <router-link to="pollutionTrend" ><dd>污染变化趋势</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>VOC监测</dt>
                        <router-link to="pollutionTrend" ><dd>污染变化趋势</dd></router-link>
                    </dl>
                    <dl class="list-sub-item">
                        <dt>设备管理</dt>
                        <router-link to="source" ><dd>污染溯源</dd></router-link>
                        <router-link to="devLook" ><dd>设备浏览</dd></router-link>
                        <router-link to="mngConfig" ><dd>系统配置</dd></router-link>
                        <router-link to="alarmWarning" ><dd>污染报警预警</dd></router-link>
                    </dl>
                </div>
            </li>
            <li>
                <i class="icon icon-baobiaozhongxin"></i><span>系统管理</span>
                <div class="list-sub">
                    <dl class="list-sub-item">
                        <router-link to="mngUser">
                            <dd>用户管理</dd>
                        </router-link>
                        <router-link to="aLiam">
                            <dd>打印</dd>
                        </router-link>
                        <router-link to="planManage">
                            <dd>抑尘计划管理</dd>
                        </router-link>
                    </dl>
                </div>
            </li>
        </ul>

            <!--<template v-for="(menu,index) in menuData" >-->
                <!--<template v-if="menu.childrens.length>0">-->
                    <!--<li :key="index">-->
                        <!--<i :class="menu.resource.description"></i><span>{{menu.resource.name}}</span>-->
                        <!--<div class="list-sub">-->
                            <!--<dl v-if="menu.childrens[0].childrens.length==0" class="list-sub-item">-->
                                <!--<template v-for="(item,ci) in menu.childrens">-->
                                            <!--<router-link :to="item.resource.url">-->
                                                <!--<dd  :key="item.code">{{item.resource.name}}</dd>-->
                                            <!--</router-link>-->
                                <!--</template>-->
                            <!--</dl>-->
                            <!--<template v-if="menu.childrens[0].childrens.length>0">-->
                                <!--<dl class="list-sub-item" v-for="item in menu.childrens" :style="menu.resource" :key="item.code">-->
                                    <!--<dt>{{item.resource.name}}</dt>-->
                                    <!--<router-link v-for="child in item.childrens" :to="child.resource.url" :key="child.code">-->
                                        <!--<dd>{{child.resource.name}}</dd>-->
                                    <!--</router-link>-->
                                <!--</dl>-->
                            <!--</template>-->
                        <!--</div>-->
                    <!--</li>-->
                <!--</template>-->
                <!--<template v-if="menu.childrens.length == 0">-->
                    <!--<li>-->
                        <!--<router-link :to="menu.resource.url"><i :class="menu.resource.description"></i><span>{{menu.resource.name}}</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                <!--</template>-->
            <!--</template>-->
        <!--</ul>-->
    </div>

</template>

<script>
    export default {
        name: "AmfNavHtml",
        data() {
            return {
                menuData: [],
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.menuData = JSON.parse(sessionStorage.getItem("menus"))
            }
        },
    }
</script>

<style scoped>

</style>
