<template>
<div>
      <div id="studentPhoTable" >
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
    　　　　</div>
  　　　　<button v-print="printObj">打印</button>
  　　　　<button @click="test">打印1</button>
</div>
</template>

<script>
    export default {
        name: "aliam",
      data() {
        return {
          printObj: {
            id: "studentPhoTable",
            popTitle: '',
            // extraCss: 'https://www.google.com,https://www.google.com',
            extraHead: '<meta http-equiv="Content-Language" content="zh-cn"/>',
            endCallback:function (data) {
              debugger
            }
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        };
      },
      methods:{
        //打印操作
        print:function () {
      var userAgent = navigator.userAgent.toLowerCase(); //取得浏览器的userAgent字符串
      if (userAgent.indexOf("trident") > -1) {
        alert("请使用google或者360浏览器打印");
        return false;
      } else if (userAgent.indexOf('msie') > -1) {
        var onlyChoseAlert = simpleAlert({
          "content" : "请使用Google或者360浏览器打印",
          "buttons" : {
            "确定" : function() {
              onlyChoseAlert.close();
            }
          }
        })
        alert("请使用google或者360浏览器打印");
        return false;
      } else {//其它浏览器使用lodop
        var oldstr = document.body.innerHTML;
        var headstr = "<html><head><title></title></head><body>";
        var footstr = "</body></html>";
        //执行隐藏打印区域不需要打印的内容
        // document.getElementById("otherpho").style.display="none";
        var printData = document.getElementById("studentPhoTable").innerHTML; //获得 div 里的所有 html 数据
        var wind = window.open("", "newwin",
          "toolbar=no,scrollbars=yes,menubar=no");
        wind.document.body.innerHTML = headstr + printData + footstr;
        // wind.print();
        //打印结束后，放开隐藏内容
        // document.getElementById("otherpho").style.display="block";
        // wind.close();
          wind.document.close();
          wind.print();
          wind.close();
        window.document.body.innerHTML = oldstr;
      }
    },
          daa:function () {
            this.print(this.$refs.print)
          },
          test:function () {
              var printWin = window.open('打印窗口', '_blank')
                  ;
                  let style = ['<style>'
                  ,'body{font-size: 12px; color: #666;}'
                  ,'table{width: 100%; border-collapse: collapse; border-spacing: 0;}'
                  ,'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}'
                  ,'a{color: #666; text-decoration:none;}'
                  ,'*.layui-hide{display: none}'
                  ,'</style>'].join('')
                  ;
                  //输出表头
              let $studentPhoTable = $("#studentPhoTable");
              $studentPhoTable.prop(style);
              // let html  = document.getElementById("studentPhoTable").innerHTML;
              // html.append(that.layMain.find('table').html()); //输出表体
              // html.append(that.layTotal.find('table').html()) //输出合计行
              //
              // html.find('th.layui-table-patch').remove(); //移除补丁
              // html.find('.layui-table-col-special').remove(); //移除特殊列

              printWin.document.write(style+$studentPhoTable.prop("outerHTML"));
              printWin.document.close();
              printWin.print();
              printWin.close();
          }
      }
    }
</script>

<style scoped>
  @page{
    size:  auto;   /* auto is the initial value */
    margin: 3mm;  /* this affects the margin in the printer settings */
  }
</style>
