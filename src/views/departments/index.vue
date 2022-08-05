<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools :isRoot="true" :treeNode="compay" />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps">
          <template v-slot="{ data }">
            <treeTools :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/treeTools.vue'
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
      compay: { name: '传智教育', manager: '负责人' }
    }
  },

  created() {},

  methods: {},
  components: {
    treeTools
  }
}
</script>

<style scoped lang="less"></style>
