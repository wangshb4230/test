/**
 *表格列数据、 表格数据 和 导出文件名
 */
export default function tableToExcel(columns,tableData,fileName) {
    //列标题，逗号隔开
    let str = '';
    columns.forEach((item, index) => {
        if (index === columns.length - 1) {
            str += `${item.title}\n`;
        } else {
            str += `${item.title},`;
        }
    });
    //增加\t为了不让表格显示科学计数法或者其他格式
    for(let i = 0; i < tableData.length; i++){
        for(let item in tableData[i]){
            str+=`${tableData[i][item] + '\t'},`;
        }
        str+='\n';
    }
    //encodeURIComponent解决中文乱码， \ufeff是 ""
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);

    //通过创建a标签实现
    let link = document.createElement("a");
    link.href = uri;
    link.download = fileName+new Date().format('yyyyMMddhhmmss')+'.csv'; //下载后文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
