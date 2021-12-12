interface LoadScriptOptions {
  type: string
  charset: string
  async: boolean
}

class LoadScript {
  /**
   * 已被加载 script
   */
  public static load: Record<string, HTMLScriptElement> = Object.create(null)

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static resolve: Function | null = null
  // eslint-disable-next-line @typescript-eslint/ban-types
  private static reject: Function | null = null

  public el: HTMLScriptElement | undefined

  public options: LoadScriptOptions = {
    type: 'text/javascript',
    charset: 'utf8',
    async: true
  }

  constructor(options?: LoadScriptOptions) {
    if (options) this.options = Object.assign(this.options, options)
  }

  private createElement(url: string, options: LoadScriptOptions) {
    const el = document.createElement('script')
    const haveLoadScript = Object.prototype.hasOwnProperty.call(LoadScript.load, url)

    if (haveLoadScript) {
      if (LoadScript.load[url].getAttribute('load') !== 'load') {
        console.info(`已有script ${url} 正在加载`)
        return
      }

      console.warn(`已有script ${url} 加载完毕`)
      return
    }

    LoadScript.load[url] = el

    el.src = url
    el.async = options.async
    el.charset = options.charset
    el.type = options.type
    return el
  }

  private addEventListener(el: HTMLScriptElement) {
    el.addEventListener('load', () => {
      if (!el.getAttribute('load')) el.setAttribute('load', 'load')
      console.info(el.src + '已加载完毕')

      LoadScript.resolve!(this)
    })

    el.addEventListener('error', () => {
      console.error(el.src + '载完毕失败')
      LoadScript.reject!(this)
    })

    document.getElementsByTagName('head')[0].appendChild(el)
  }

  public load(url: string, options?: LoadScriptOptions) {
    this.el = this.createElement(url, options || this.options)

    return new Promise((r, j) => {
      LoadScript.resolve = r
      LoadScript.reject = j

      if (this.el) {
        this.addEventListener(this.el)
        return
      }

      LoadScript.resolve(this)
    })
  }
}

export default LoadScript
