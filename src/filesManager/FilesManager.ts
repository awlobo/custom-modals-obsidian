import { App, TFolder } from "obsidian";

class FilesManager {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  async getExtraFileData(file: any) {
    return {
      ...file,
      frontmatter: this.app.metadataCache.getFileCache(file)?.frontmatter,
      contents: await this.app.vault.cachedRead(file),
    }
  }

  async getModalFiles() {
    const root = this.app.vault.getRoot();
    // hack that let's us get the modals folder children
    const modalsFolder: TFolder = { 
      children: [], 
      isRoot: () => false, 
      ...root.children.find((child) => child.name === "modals")
    };
    // get all the modals files
    const modalFiles = modalsFolder.children.map((child) => app.vault.getAbstractFileByPath(child.path));

    // return the modal files + extra data
    return await Promise.all(modalFiles.map(async (file) => {
      const extraData = await this.getExtraFileData(file);
      return extraData;
    }));
  }
  
}

export default FilesManager;