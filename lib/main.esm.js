function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class LoadScript {
  /**
   * 已被加载 script
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(options) {
    _defineProperty(this, "el", void 0);

    _defineProperty(this, "options", {
      type: 'text/javascript',
      charset: 'utf8',
      async: true
    });

    if (options) this.options = Object.assign(this.options, options);
  }

  createElement(url, options) {
    const el = document.createElement('script');
    const haveLoadScript = Object.prototype.hasOwnProperty.call(LoadScript.load, url);

    if (haveLoadScript) {
      if (LoadScript.load[url].getAttribute('load') !== 'load') {
        console.info(`已有script ${url} 正在加载`);
        return;
      }

      console.warn(`已有script ${url} 加载完毕`);
      return;
    }

    LoadScript.load[url] = el;
    el.src = url;
    el.async = options.async;
    el.charset = options.charset;
    el.type = options.type;
    return el;
  }

  addEventListener(el) {
    el.addEventListener('load', () => {
      if (!el.getAttribute('load')) el.setAttribute('load', 'load');
      console.info(el.src + '已加载完毕');
      LoadScript.resolve(this);
    });
    el.addEventListener('error', () => {
      console.error(el.src + '载完毕失败');
      LoadScript.reject(this);
    });
    document.getElementsByTagName('head')[0].appendChild(el);
  }

  load(url, options) {
    this.el = this.createElement(url, options || this.options);
    return new Promise((r, j) => {
      LoadScript.resolve = r;
      LoadScript.reject = j;

      if (this.el) {
        this.addEventListener(this.el);
        return;
      }

      LoadScript.resolve(this);
    });
  }

}

_defineProperty(LoadScript, "load", Object.create(null));

_defineProperty(LoadScript, "resolve", null);

_defineProperty(LoadScript, "reject", null);

export { LoadScript as default };
