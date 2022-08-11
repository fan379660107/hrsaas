<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table :data="employess">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" sortable prop="formOfEmployment" />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable prop="enableState" />
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="size"
            :current-page="page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployessInfoApi } from '@/api/employees'
export default {
  name: 'Employess',
  data() {
    return {
      page: 1, //页码
      size: 5, //每页条数
      employess: [],
      loading: false,
      total: 0
    }
  },

  created() {
    this.getEmployessInfoApi()
  },

  methods: {
    async getEmployessInfoApi() {
      const { rows, total } = await getEmployessInfoApi({
        page: this.page,
        size: this.size
      })
      this.employess = rows
      this.total = total
    },
    changePage(val) {
      this.page = val
      this.getEmployessInfoApi()
    }
  }
}
</script>

<style scoped lang="less"></style>
