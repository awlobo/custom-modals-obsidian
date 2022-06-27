import { App } from "obsidian";

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

  async getAllFiles() {
    const filesData: any = await Promise.all(
      this.app.vault.getMarkdownFiles().map(async (file) => (await this.getExtraFileData(file)))
    );
    
    return filesData;
  }
  
}

export default FilesManager;