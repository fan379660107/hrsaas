<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportEmployess"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addEmployees"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table :data="employess">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="
                  require('@/assets/common/20191125-144728-7a47.webp')
                "
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            :formatter="formatterFormOfEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delFn(row.id)"
                >删除</el-button
              >
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
    <!-- 弹窗 -->
    <AddEmployees
      @add-success="getEmployessInfoApi"
      :visible.sync="showEmployees"
    ></AddEmployees>
  </div>
</template>

<script>
import { getEmployessInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from './components/addEmployees.vue'
const { exportExcelMapPath, hireType } = employees
export default {
  name: 'Employess',
  data() {
    return {
      page: 1, //页码
      size: 5, //每页条数
      employess: [],
      loading: false,
      total: 0,
      showEmployees: false
    }
  },

  created() {
    this.getEmployessInfoApi()
  },
  components: {
    AddEmployees
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
    },
    formatterFormOfEmployment(row, column, cellValue, index) {
      const findHireType = employees.hireType.find(
        (item) => item.id === cellValue
      )
      return findHireType ? findHireType.value : '饲养员'
    },
    async delFn(id) {
      await this.$confirm('是否删除该员工？')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.getEmployessInfoApi()
    },
    addEmployees() {
      this.showEmployees = true
    },
    async exportEmployess() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployessInfoApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })

      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
        multiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:F1', 'G1:G2']
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
