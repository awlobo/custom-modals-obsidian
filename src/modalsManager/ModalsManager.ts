import { App, Plugin } from "obsidian";
import CustomModal from "src/modal/CustomModal";
import { CustomModalSettings } from "src/modal/CustomModalSettings";
import ModalFileParser from "src/modalFileParser/ModalFileParser";

class ModalsManager {
  modals: any = {};
  modalSettings: any = {};
  modalFileParser: ModalFileParser = new ModalFileParser();

  plugin: Plugin;
  app: App;

  constructor(plugin: Plugin, app: App) {
    this.plugin = plugin;
    this.app = app;
  }

  createModalSettingsFromFile(file: any) {
    const { jsBlocks, htmlBlocks } = this.modalFileParser.parse(file.contents);

    const modalSettings = new CustomModalSettings({
      title: file.frontmatter?.title,
      content: htmlBlocks.length ? htmlBlocks[0] : "",
      okText: file.frontmatter?.okText,
      cancelText: file?.frontmatter?.cancelText,
      handleOk: jsBlocks.length ? jsBlocks[0] : undefined,
      handleCancel: jsBlocks.length > 1 ? jsBlocks[1] : undefined,
      preRender: jsBlocks.length > 2 ? jsBlocks[2] : undefined,
      postRender: jsBlocks.length > 3 ? jsBlocks[3] : undefined,
    })

    this.modalSettings[file.path] = modalSettings;
  }

  createModalSettingsFromFilesData(allFiles: any) {
    allFiles.forEach((file: any) => {
      if (file.path.startsWith("modals/")) {
        this.createModalSettingsFromFile(file);
      }
    })
  }


  addModalCommand(path: string, modalSettings: CustomModalSettings) {
    this.plugin.addCommand({
      id: `open-modal-${path.split('/')[1]}`,
      name: `Open ${modalSettings.title || "Modal"}`,
      callback: () => {
        this.modals[path].open();
      }
    });
  }

  createModals(allFiles: any) {
    // create settings
    this.createModalSettingsFromFilesData(allFiles);

    // create modals from settings
    Object.entries(this.modalSettings).forEach(([path, modalSettings]) => {
      if (!modalSettings.title)
        return;
        
      this.modals[path] = new CustomModal(this.plugin, modalSettings);
      this.addModalCommand(path, modalSettings);
    });
  }

  createModal(file: any) {
    this.createModalSettingsFromFile(file);
    const settings = this.modalSettings[file.path];
    
    if (!settings.title)
      return;

    this.modals[file.path] = new CustomModal(this.plugin, this.modalSettings[file.path]);
    this.addModalCommand(file.path, this.modalSettings[file.path]);
  }
}

export default ModalsManager;