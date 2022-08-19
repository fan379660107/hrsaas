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

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
