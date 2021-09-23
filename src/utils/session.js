// 本地存储的sessionStorage 封装
export default {
  // 存数据
  save(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  // 取数据
  get(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  },
  //  清除数据
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear()
  }
}