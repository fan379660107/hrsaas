import dayjs from 'dayjs'
//在该文件中定义的时间过滤器
export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
