import request from '@/utils/request'
/**
 * 获取员工简单列表
 * @returns promise
 */
export const getEmployessApi = () =>
  request({
    url: '/sys/user/simple'
  })

/**
 *获取员工列表
 * @param {Object} params {page,size}
 * @returns promise
 */
export const getEmployessInfoApi = (params) =>
  request({
    url: '/sys/user',
    params
  })
