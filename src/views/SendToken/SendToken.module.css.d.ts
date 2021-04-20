declare namespace SendTokenModuleCssNamespace {
  export interface ISendTokenModuleCss {
    all: string;
    amount: string;
    amountError: string;
    amountLine: string;
    amountPointer: string;
    container: string;
    decrease: string;
    heading: string;
    increase: string;
    maximum: string;
    paste: string;
    recipient: string;
    recipientLine: string;
    recipientWithButton: string;
    setTip: string;
    subline: string;
    submit: string;
    tip: string;
    total: string;
    totalLine: string;
  }
}

declare const SendTokenModuleCssModule: SendTokenModuleCssNamespace.ISendTokenModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SendTokenModuleCssNamespace.ISendTokenModuleCss;
};

export = SendTokenModuleCssModule;