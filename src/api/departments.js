import request from '@/utils/request'
/**
 * 获取组织架构的数据
 * @returns promise
 */
export const getDeptsApi = () =>
  request({
    url: '/company/department'
  })
/**
 * 根据Id删除部门
 * @param {*} id 要删除得部门的id
 * @returns promise
 */
export const delDeptsApi = (id) =>
  request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
/**
 * 新增部门
 * @param {*} data
 * code 同级部门不可重复
 * introduce 介绍
 * manager 负责人名称
 * name 部门名称
 * pid 父级部门ID
 * @returns promise
 */
export const addDeptsApi = (data) =>
  request({
    url: '/company/department',
    method: 'POST',
    data
  })
