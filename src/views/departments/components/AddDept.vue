<template>
  <el-dialog title="添加部门" :visible="visible" width="50%" @close="onClose">
    <!-- 表单区域 -->
    <el-form :model="formData" :rules="form" ref="form" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="输入部门的名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="输入部门的名称"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          placeholder="请选择活部门负责人"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptsApi } from '@/api/departments'
import { getEmployessApi } from '@/api/employees'
export default {
  name: 'AddDept',
  data() {
    const checkDeptName = (rule, value, callback) => {
      // console.log(this.currrentNode)
      //1、 判断value 是否 和添加的同级部门是否重复（获取到同级部门）
      const isRepeat = this.currrentNode.children?.some((item) => {
        return item.name === value
      })
      // 2、如果重复了 callback(new Error('部门重复'))
      if (isRepeat) return callback(new Error('部门重复'))
      //3、如果没有重复则callback()
      callback()
    }
    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDeptsApi()
      // console.log(depts)
      const isRepeat = depts.some((item) => item.code === value)
      isRepeat ? cb(new Error('部门编码重复')) : cb()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      form: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currrentNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getEmployessApi()
  },

  methods: {
    //获取员工简单列表
    async getEmployessApi() {
      const res = await getEmployessApi()
      // console.log(res)
      this.employees = res
    },
    //关闭弹窗事件
    onClose() {
      this.$emit('update:visible', false)
    },
    //点击提交事件
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currrentNode.id
      await addDeptsApi(this.formData)
      this.$message.success('新增部门成功')
      this.onClose()
      this.$emit('addDept')
    }
  }
}
</script>

<style scoped></style>
