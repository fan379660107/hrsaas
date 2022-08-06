<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools :isRoot="true" :treeNode="compay" @add="showAddDept" />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <treeTools
              :treeNode="data"
              @remove="getDeptsApi"
              @add="showAddDept"
            />
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门弹层 -->
    <AddDept
      :visible.sync="dialogVisible"
      :currrentNode="currrentNode"
      @addDept="getDeptsApi"
    />
  </div>
</template>

<script>
import { getDeptsApi } from '@/api/departments'
import treeTools from './components/treeTools.vue'
import { transListToTree } from '@/utils'
import AddDept from './components/AddDept.vue'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      compay: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currrentNode: {}
    }
  },

  created() {
    this.getDeptsApi()
  },

  methods: {
    async getDeptsApi() {
      const res = await getDeptsApi()
      // console.log(res)
      this.treeData = transListToTree(res.depts, '')
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currrentNode = val
    }
  },
  components: {
    treeTools,
    AddDept
  }
}
</script>

<style scoped lang="less"></style>
