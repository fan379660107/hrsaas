<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="visible">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
// id AKID74nHWWHn34qNfiY9VdYEfv775uX0Tq21
// key pQo14uXw8AKQL2WlnaCaljU1SggS0KQH
import COS from 'cos-js-sdk-v5'

var cos = new COS({
  SecretId: 'AKID74nHWWHn34qNfiY9VdYEfv775uX0Tq21',
  SecretKey: 'pQo14uXw8AKQL2WlnaCaljU1SggS0KQH'
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      imgUrl: '',
      visible: false,
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341619' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            console.log(err)
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', { url: 'https://' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      console.log(file)
      this.visible = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      //可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2Mb')
        return false
      }
      //   console.log('上传前的校验')
    }
  }
}
</script>

<style scoped lang="scss">
img {
  width: 200px;
  height: 200px;
}
.hide .el-upload--picture-card {
  display: none;
}

.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
