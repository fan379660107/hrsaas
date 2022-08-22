import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {*} params
 * @returns
 */
export const getRolesApi = (params) =>
  request({
    url: '/sys/role',
    params
  })

/**
 * 添加角色
 * @param {*} data name 角色名称 region 角色描述
 * @returns promise
 */
export const addRolesApi = (data) =>
  request({
    url: '/sys/role',
    method: 'POST',
    data
  })

/**
 * 根据id获取角色详情
 * @param {*} id 角色id
 * @returns promise
 */
export const getRolesInfo = (id) =>
  request({
    url: '/sys/role/' + id
  })

/**
 * 给角色分配权限
 * @param {*} data {id,permIds}
 * @returns promise
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
