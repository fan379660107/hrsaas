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
