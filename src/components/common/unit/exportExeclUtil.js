/**
 *表格列数据、 表格数据 和 导出文件名
 */
export default function tableToExcel(columns,tableData,fileName) {
    let str = '<tr><td>';
    // 表头
    columns.forEach((item, index) => {
        if (index === columns.length - 1) {
            str += `${item.title}</td></tr>`;
        } else {
            str += `${item.title}</td><td>`;
        }
    });
    // 数据
    for (let i = 0; i < tableData.length; i++) {
        str += '<tr>';
        for (let item in tableData[i]) {
            //增加\t为了不让表格显示科学计数法或者其他格式
            str += `<td>${tableData[i][item]}</td>`;
        }
        str += '</tr>';
    }
    let excelHtml = `
        <html>
            <head>
             <meta charset='utf-8' />
            </head>
             <body>
                <table border="1">
                  ${str}
                </table>
             </body>
        </html>
  `
    let excelBlob = new Blob([excelHtml], {type: 'application/vnd.ms-excel'})

    // 创建一个a标签
    let oA = document.createElement('a');
    var href = window.URL.createObjectURL(excelBlob); //创建下载的链接
    oA.href = href;
    oA.download = fileName+new Date().format('yyyyMMddhhmmss')+'.xls'; //下载后文件名
    document.body.appendChild(oA);
    oA.click(); //点击下载
    document.body.removeChild(oA); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}
