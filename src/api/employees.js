import request from '@/utils/request'
/**
 * 获取员工简单列表
 * @returns promise
 */
export const getEmployessApi = () =>
  request({
    url: '/sys/user/simple'
  })
