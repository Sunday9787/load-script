interface LoadScriptOptions {
  type: string;
  charset: string;
  async: boolean;
}

declare class LoadScript {
  /**
   * 已被加载 script
   */
  public static load;
  private static resolve;
  private static reject;
  public el;
  public options;
  constructor(options?: LoadScriptOptions);
  private createElement;
  private addEventListener;
  load(url: string, options?: LoadScriptOptions): Promise<void>;
}

export default LoadScript;
