<template>
  <div class="table-div">
    {{ title }}
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>
</template>
<script>

import { getTableData } from '@/api/table'
export default {
  name: 'MyTable',
  data() {
    return {
      title: 'table',
      loading: false,
      tableData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getTableData(10, 1)
    },
    getTableData(limt, offset) {
      this.loading = true
      getTableData(limt, offset).then(res => {
        this.loading = false
        if (res.code === 0 && res.items) {
          this.tableData = res.items.entry
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
  .table-div {
    padding: 10px
  }
</style>
