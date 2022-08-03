// 参数1：自定义指令的名字:不需要加+v-
//参数2:是配置对象
export const imgError = {
  //当绑定的元素插入到DOM 中时....
  inserted: function (el, { value }) {
    // 聚焦元素
    el.onerror = function () {
      el.src = value
    }
  }
}
export const aa = {
  inserted() {}
}
export const bb = {
  inserted() {}
}
