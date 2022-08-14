import request from '@/utils/request'
/**
 *  获取token
 * @param {*} data
 * @returns promise
 */
export const login = (data) =>
  request({
    url: '/sys/login',
    method: 'POST',
    data
  })
/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfoApi = () =>
  request({
    url: '/sys/profile',
    method: 'POST'
  })
/**
 *  根据用户id获取员工详情数据
 * @param {*} id 用户id
 * @returns promise
 */
export const getUserDetail = (id) =>
  request({
    url: `/sys/user/${id}`
  })

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
