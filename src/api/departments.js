import request from '@/utils/request'
/**
 * 获取组织架构的数据
 * @returns promise
 */
export const getDeptsApi = () =>
  request({
    url: '/company/department'
  })
