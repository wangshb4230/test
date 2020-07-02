import Vue from 'vue'
import Router from 'vue-router'
import LoginHtml from '../components/loginHtml'
import loginByToken from '../components/loginByToken'
import amfHomeHtml from '@/components/common/page/AmfHomeHtml'
import homeHtml from '../components/page/homePage/HomeHtml'
/*------------------------lx start-----------------------------------*/
import devLook from '../components/page/devInfo/devLook'
import mngConfig from '../components/page/mngInfo/mngConfig'
import source from '../components/page/control/source'
import alarmWarning from '../components/page/control/alarmWarning'
import pollutionTrend from '../components/page/dust/pollutionTrend'
import airPollutionTrend from '../components/page/air/airPollutionTrend'
/*------------------------lx end-----------------------------------*/

/*------------------------guojianxin start---------------------*/
import mngUser from '../components/page/mngInfo/mngUser'
import aLiam from '../components/page/mngInfo/ALiam'
import planManage from '../components/page/control/planManage'
import polluteTherm from '../components/page/charts/dust/polluteTherm'
import airPolluteTherm from '../components/page/charts/air/airPolluteTherm'
import vocPolluteTherm from '../components/page/charts/voc/vocPolluteTherm'
/*------------------------guojianxin end---------------------*/

/*------------------------sunyu start---------------------*/

import realRanking from "../components/page/statistical/dust/realRanking";
import hisRanking from "../components/page/statistical/dust/hisRanking";
import comparison from "../components/page/statistical/dust/comparison";
import airRealRanking from "../components/page/statistical/air/airRealRanking";
import airHisRanking from "../components/page/statistical/air/airHisRanking";
import vocRealRanking from "../components/page/statistical/voc/vocRealRanking";
import vocHisRanking from "../components/page/statistical/voc/vocHisRanking";
/*------------------------sunyu end---------------------*/
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/loginByToken',
            name: 'loginByToken',
            component: loginByToken
        },
        {
            path: '/',
            name: 'LoginHtml',
            component: LoginHtml
        },
        {
            path: '/amfHomeHtml',
            name: 'amfHomeHtml',
            component: amfHomeHtml,
            redirect: '/homeHtml',
            children: [
                {
                    path: '/homeHtml',
                    name: 'homeHtml',
                    meta: {
                        auth: false//开启页面登陆状态校验
                    },
                    component: homeHtml
                },
                /*------------------------lx start-----------------------------------*/
                {
                    path: '/devLook',
                    name: 'devLook',
                    meta: {
                      //  auth: false//开启页面登陆状态校验
                    },
                    component: devLook
                },
                {
                    path: '/mngConfig',
                    name: 'mngConfig',
                    meta: {
                        auth: false//开启页面登陆状态校验
                    },
                    component: mngConfig
                },
                {
                    path: '/source',
                    name: 'source',
                    meta: {
                        auth: false//开启页面登陆状态校验
                    },
                    component: source
                },
                {
                    path: '/alarmWarning',
                    name: 'alarmWarning',
                    meta: {
                        auth: false//开启页面登陆状态校验
                    },
                    component: alarmWarning
                },
                {
                    path: '/pollutionTrend',
                    name: 'pollutionTrend',
                    meta: {
                        auth: false//开启页面登陆状态校验
                    },
                    component: pollutionTrend
                },
                {
                    path: '/airPollutionTrend',
                    name: 'airPollutionTrend',
                    meta: {
                        auth: false//开启页面登陆状态校验
                    },
                    component: airPollutionTrend
                },
                /*------------------------lx end-----------------------------------*/
                /*------------------------guojianxin start---------------------*/
                {
                    path: '/mngUser',
                    name: 'mngUser',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: mngUser
                },
                {
                    path: '/planManage',
                    name: 'planManage',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: planManage
                },
                {
                    path: '/aLiam',
                    name: 'aLiam',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: aLiam
                },
                {
                    path: '/polluteTherm',
                    name: 'polluteTherm',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: polluteTherm
                },
                {
                    path: '/airPolluteTherm',
                    name: 'airPolluteTherm',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: airPolluteTherm
                },
                {
                    path: '/vocPolluteTherm',
                    name: 'vocPolluteTherm',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: vocPolluteTherm
                },
                /*------------------------guojianxin end---------------------*/
                /*------------------------sunyu start---------------------*/
                {
                    path: '/realRanking',
                    name: 'realRanking',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: realRanking
                },
                {
                    path: '/hisRanking',
                    name: 'hisRanking',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: hisRanking
                },
                {
                    path: '/comparison',
                    name: 'comparison',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: comparison
                },
                {
                    path: '/airRealRanking',
                    name: 'airRealRanking',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: airRealRanking
                },
                {
                    path: '/airHisRanking',
                    name: 'airHisRanking',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: airHisRanking
                },
                {
                    path: '/vocRealRanking',
                    name: 'vocRealRanking',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: vocRealRanking
                },
                {
                    path: '/vocHisRanking',
                    name: 'vocHisRanking',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: vocHisRanking
                },
                /*------------------------sunyu end---------------------*/


            ]
        }
    ]

})
