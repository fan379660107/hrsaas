<template>
  <div class="dashboard-container">
    <UploadExcel
      :beforeUpload="excelSuccess"
      :onSuccess="onSuccess"
    ></UploadExcel>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { impoortMapKeyPath } = employees
import { importEmployees } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传文件处理
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    // 上传成功
    async onSuccess({ header, results }) {
      const newArray = results.map((item) => {
        const obj = {}
        for (let k in impoortMapKeyPath) {
          if (k === '入职日期' || k === '转正日期') {
            // excle 时间戳 处理成js时间戳
            const timestamp = item[k]
            const date = new Date((timestamp - 1) * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[impoortMapKeyPath[k]] = formatTime(date)
          } else {
            obj[impoortMapKeyPath[k]] = item[k]
          }
        }
        return obj
      })
      await importEmployees(newArray)
      this.$message.success('导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less"></style>
