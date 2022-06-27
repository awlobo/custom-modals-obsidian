export interface CustomModalSettingsInterface {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
  handleOk?: Function;
  handleCancel?: Function;
  preRender?: Function;
  postRender?: Function;
  ctx?: any;
}

export class CustomModalSettings {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
  handleOk?: Function;
  handleCancel?: Function;
  preRender?: Function;
  postRender?: Function;
  ctx: any;

  constructor({
    title,
    content = "",
    okText = "Ok",
    cancelText = "Cancel",
    handleOk = () => {},
    handleCancel = () => {},
    preRender = () => {},
    postRender = () => {},
  }: CustomModalSettingsInterface) {
    this.title = title;
    this.content = content;
    this.okText = okText;
    this.cancelText = cancelText;
    this.handleOk = handleOk;
    this.handleCancel = handleCancel;
    this.postRender = postRender;
    this.preRender = preRender;
    this.ctx = {};
  }
}