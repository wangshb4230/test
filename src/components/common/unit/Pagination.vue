<template>
    <el-pagination background
                   :current-page="cur_page"
                   :page-sizes="pageSizes"
                   :page-size="cur_pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   layout="total, prev, pager, next, sizes"
                   :total=count
                   :hide-on-single-page="true">
    </el-pagination>
</template>

<script>
    export default {
        name: "Pagination",
        data(){
            return {
                cur_page: 1,//当前页
                cur_pageSize: 10,//当前分页单位
                count: 0,
                pageSizes:  [5,10,15,20]
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.$emit("paginationFunction");
            },
            handleSizeChange(val){
                this.cur_pageSize = val;
                this.$emit("paginationFunction");
            }
        }
    }
</script>

<style scoped>

</style>
