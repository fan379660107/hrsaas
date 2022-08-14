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

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 *批量导入员工
 * @param {*} data
 * @returns  promise
 */
export const importEmployees = (data) =>
  request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
