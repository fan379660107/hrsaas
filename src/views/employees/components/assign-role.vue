<template>
  <el-dialog
    @open="onOpen"
    title="分配角色"
    :visible="visible"
    @close="onClose"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'Role',
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employessId: {
      type: String,
      required: true
    }
  },
  created() {},

  methods: {
    //关闭事件
    onClose() {
      this.$emit('update:visible', false)
    },
    //获取角色列表
    async getRolesApi() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    //获取员工角色
    async getUserDetail() {
      const { roleIds } = await getUserDetail(this.employessId)
      this.checkList = roleIds
    },
    //确定事件
    async onSubmit() {
      if (!this.checkList.length) return this.$message.error('请选中角色')
      await assignRoles({
        id: this.employessId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.onClose()
    },
    onOpen() {
      this.getRolesApi()
      this.getUserDetail()
    }
  }
}
</script>

<style scoped></style>
