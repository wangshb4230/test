(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    //color
    var color = [
            "#3fb1e3",
            "#6be6c1",
            "#626c91",
            "#a0a7e6",
            "#c4ebad",
            "#96dee8"
        ];//颜色
    var backgroundColor = "rgba(0,0,0,0)";//背景色
    var fontSize = 14;//文字大小,label
    //grid
    var leftGrid = 20; //距离左侧距离
    var rightGrid = 20; //距离右侧距离
    var topGrid = 55; //距离顶部距离
    var bottomGrid = 20; //距离底部距离
    var containLabel = true; //grid区域是否包含坐标轴的刻度标签

    //标题
    var colorTitle = "#333"; //主标题颜色
    var fontSizeTitle = 16; //主标题大小
    var colorSubTitle = "#999"; //主标题颜色
    var fontSizeSubTitle = 12; //主标题大小
    var leftTitle = 15;//主标题距离左侧距离，标题自带5px留白
    var topTitle = 10;//主标题距离顶部距离，标题自带5px留白

    //图例
    var colorLegend = "#666"; //图例文字颜色
    var leftLegend = "auto";
    var rightLegend = 15;
    var topLegend = 10;
    var itemGapLegend = 20;//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
    var itemWidthLegend = 20;//图例标记的图形宽度。 
    var itemHeightLegend = 8;//图例标记的图形高度。
    var fontSizeLegend = 14; //图例字号

    //轴线-类目轴
    var showAxisLineLine = true; //是否显示轴线
    var colorAxisLineLine = "#999999"; //轴线颜色

    var showAxisLineLable = true; //是否显示标签
    var colorAxisLineLable = "#666666"; //标签颜色
    var fontSizeAxisLineLable = 14; //标签文字字号

    var showAxisLineTick = true; //是否显示刻度
    var colorAxisLineTick = "#999999"; //刻度颜色

    var showAxisLineSplitLine = false; //是否显示分割线
    var colorAxisLineSplitLine = ['#eeeeee']; //分割线颜色
    var colorAxisLineSplitLineType = "dashed"; //分割线类型

    var showAxisLineSplitArea = false; //是否显示分割区域
    var colorAxisLineSplitArea = ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]; //分割区域颜色


    //轴线-数值轴
    var showValueLineLine = true; //是否显示轴线
    var colorValueLineLine = "#999999"; //轴线颜色

    var showValueLineLable = true; //是否显示标签
    var colorValueLineLable = "#666666"; //标签颜色
    var fontSizeValueLineLable = 14; //标签文字字号

    var showValueLineTick = true; //是否显示刻度
    var colorValueLineTick = "#999999"; //刻度颜色

    var showValueLineSplitLine = true; //是否显示分割线
    var colorValueLineSplitLine = ["#999999"]; //分割线颜色
    var colorValueLineSplitLineType = "dashed"; //分割线类型

    var showValueLineSplitArea = false; //是否显示分割区域
    var colorValueLineSplitArea = ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]; //分割区域颜色

    //折线图
    var symbolSizeLine = 8;//标记的图形大小
    var symbolTypeLine = "circle";//标记的图形类型
    var smoothLine = true;//是否平滑显示

    //雷达图
    var startAngleRadar = 90;//坐标系起始角度，也就是第一个指示器轴的角度。
    var splitNumberRadar = 4;//指示器轴的分割段数
    var symbolSizeRadar = 8;//标记的图形大小
    var symbolTypeRadar = "circle";//标记的图形类型
    var shapeRadar = "polygon";//雷达图绘制类型，支持 多边形'polygon' 和 圆形'circle'。
    var colorNameRadar =  "#666666";//name颜色
    var colorAxisLineRadar = "rgba(0,0,0,.3)";//坐标轴线线的颜色。
    var colorsplitLineRadar = "rgba(0,0,0,.2)"; //分隔线颜色
    var colorsplitAreaRadar = ["rgba(0,0,0,0)", "rgba(0,0,0,.02)"]; //分隔区域颜色


    echarts.registerTheme('skinUpp', {
        //色卡
        "color": color,
        //背景色
        "backgroundColor": backgroundColor,
        //文字
        "textStyle": {
            'fontSize' : fontSize,
        },
        //网格grid
        "grid": {
            "left": leftGrid,
            "right": rightGrid,
            "bottom": bottomGrid,
            "top": topGrid,
            "containLabel": containLabel,
        },
        //标题
        "title": {
            // 主标题
            "textStyle": {
                "color": colorTitle,
                "fontSize": fontSizeTitle,
            },
            // 副标题
            "subtextStyle": {
                "color": colorSubTitle,
                "fontSize": fontSizeSubTitle,
            },
            "left": leftTitle,
            "top": topTitle,
        },
        //折线
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": symbolSizeLine,
            "symbol": symbolTypeLine,
            "smooth": smoothLine,
        },
        //雷达图
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "5"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "smooth": true,
            //以上的好像无用
            "startAngle": startAngleRadar,
            "splitNumber": splitNumberRadar,
            "symbolSize": symbolSizeRadar,
            "symbol": symbolTypeRadar,
            "shape": shapeRadar,
            "name":{
                "textStyle": {
                    "color": colorNameRadar
                }
            },
            "axisLine": {
              "lineStyle": {
                "color": colorAxisLineRadar
              }
            },
            "splitLine": {
              "lineStyle": {
                "color": colorsplitLineRadar
              }
            },
            "splitArea": {
              "areaStyle": {
                "color": colorsplitAreaRadar
              }
            },
        },
        //柱状图
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc",
                },
                "emphasis": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                }
            },
            "barMaxWidth": "60%",//最大宽度
        },
        //饼图
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //散点（气泡）图
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //箱形图
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //平行坐标系的系列
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //桑基图
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //漏斗图
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //仪表盘
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        //K线图
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#edafda",
                    "color0": "transparent",
                    "borderColor": "#d680bc",
                    "borderColor0": "#8fd3e8",
                    "borderWidth": "2"
                }
            }
        },
        //关系图
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaaaaa"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true,
            "color": [
                "#516b91",
                "#59c4e6",
                "#edafda",
                "#93b7e3",
                "#a5e7f0",
                "#cbb0e3"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        },
        //地图
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(165,231,240,1)",
                    "borderColor": "#516b91",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(81,107,145)"
                    }
                }
            }
        },
        //地理坐标系组件
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(165,231,240,1)",
                    "borderColor": "#516b91",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(81,107,145)"
                    }
                }
            }
        },
        //类目轴
        "categoryAxis": {
            //轴线
            "axisLine": {
                "show": showAxisLineLine,
                "lineStyle": {
                    "color": colorAxisLineLine,
                }
            },
            //刻度
            "axisTick": {
                "show": showAxisLineTick,
                "lineStyle": {
                    "color": colorAxisLineTick,
                }
            },
            //标签
            "axisLabel": {
                "show": showAxisLineLable,
                "textStyle": {
                    "color": colorAxisLineLable,
                    "fontSize": fontSizeAxisLineLable,
                }
            },
            //分割线
            "splitLine": {
                "show": showAxisLineSplitLine,
                "lineStyle": {
                    "color": colorAxisLineSplitLine,
                    "type": colorAxisLineSplitLineType,
                }
            },
            //分割区域
            "splitArea": {
                "show": showAxisLineSplitArea,
                "areaStyle": {
                    "color": colorAxisLineSplitArea,
                }
            }
        },
        //数值轴
        "valueAxis": {
            //轴线
            "axisLine": {
                "show": showValueLineLine,
                "lineStyle": {
                    "color": colorValueLineLine,
                }
            },
            //刻度
            "axisTick": {
                "show": showValueLineTick,
                "lineStyle": {
                    "color": colorValueLineTick,
                }
            },
            //标签
            "axisLabel": {
                "show": showValueLineLable,
                "textStyle": {
                    "color": colorValueLineLable,
                    "fontSize": fontSizeValueLineLable,
                }
            },
            //分割线
            "splitLine": {
                "show": showValueLineSplitLine,
                "lineStyle": {
                    "color": colorValueLineSplitLine,
                    "type": colorValueLineSplitLineType,
                }
            },
            //分割区域
            "splitArea": {
                "show": showValueLineSplitArea,
                "areaStyle": {
                    "color": colorValueLineSplitArea,
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        //工具栏
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        //图例
        "legend": {
            //靠右侧，默认5px留白
            "left": leftLegend,
            "right": rightLegend,
            "top": topLegend,
            "itemGap": itemGapLegend, 
            "itemWidth": itemWidthLegend,
            "itemHeight": itemHeightLegend,
            //文字样式
            "textStyle": {
                "color": colorLegend,
                "fontSize":fontSizeLegend,
            },
        },
        //弹窗
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },

        "timeline": {
            "lineStyle": {
                "color": "#8fd3e8",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#8fd3e8"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#8fd3e8",
                "borderColor": "rgba(138,124,168,0.37)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                }
            }
        },
        //视觉映射组件
        "visualMap": {
            "color": [
                "#516b91",
                "#59c4e6",
                "#a5e7f0"
            ]
        },
        //区域缩放
        "dataZoom": {
            "backgroundColor": "rgba(0,0,0,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
        },
        //标注
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        }
    });
}));
