/**
 * @author zhi
 * @description 基于 storage 存储一些对象信息
 */

class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  setItem(name, content) {
    if (!name || !content) return;
    let data = content;
    if (typeof content !== 'string') {
      data = JSON.stringify(content);
    }
    this.storage.setItem(name, data);
  }

  getItem(name) {
    if (!name) return;
    // eslint-disable-next-line
    return this.storage.getItem(name);
  }

  removeItem(name) {
    if (!name) return;
    this.storage.removeItem(name);
  }
}

// SessionStorage
export const session = new Storage(window.sessionStorage);
// LocalStorage
export const local = new Storage(window.localStorage);
