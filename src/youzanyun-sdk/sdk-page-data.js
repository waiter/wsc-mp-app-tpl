const _f = () => {};

export default class YunSdkPageData {
  constructor() {
    this.process = {};
    this.data = {};
    this.events = {};
    this.__dataWatchers = {};
  }

  /**
   * 获取开放流程API
   */
  getProcess(processName) {
    if (!processName) {
      return;
    }

    return this.process[processName] || _f;
  }

  /**
   * 设置event
   */
  __setEvent(eventName, event) {
    if (!eventName) {
      return;
    }

    this.events[eventName] = event;
  }

  /**
   * 观测数据
   */
  watch(key, callback) {
    // 检查有效path
    // 监听修改
    if (callback) {
      if (!this.__dataWatchers[key]) {
        this.__dataWatchers[key] = [];
      }
      this.__dataWatchers[key].push(callback);
    }

    // 取消监听的handler
  }

  /**
   * 更新订阅者列表
   */
  __notifyDataSubscribers(key, val) {
    const subscribers = this.__dataWatchers[key] || [];
    subscribers.forEach(subsc => {
      subsc(val);
    });
  }

  // 添加流程函数
  __addProcess(processName, func) {
    this.process[processName] = func;
  }

  __setData(key, val) {
    this.data[key] = val;
    if (!this[key]) {
      // 允许sdk.page.xxxx访问数据
      Object.defineProperty(this, key, {
        get: () => {
          return this.data[key];
        },
        configurable: true
      });
    }
  }
}
