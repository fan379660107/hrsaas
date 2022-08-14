// 参数1：自定义指令的名字:不需要加+v-
//参数2:是配置对象
export const imgError = {
  //当绑定的元素插入到DOM 中时....
  inserted(el, { value }) {
    // 聚焦元素
    if (!el.src) {
      // console.log(value)
      // console.log(el.src)
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  }
}
export const aa = {
  inserted() {}
}
export const bb = {
  inserted() {}
}
