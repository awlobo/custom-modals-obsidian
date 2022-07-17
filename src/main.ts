import { Plugin, PluginManifest, App, TAbstractFile } from "obsidian";
import FilesManager from "./filesManager/FilesManager";
import ModalsManager from "./modalsManager/ModalsManager";

export default class CustomModalsPlugin extends Plugin {
	filesManager: FilesManager;
	modalsManager: ModalsManager;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);

		this.filesManager = new FilesManager(app);
		this.modalsManager = new ModalsManager(this, app);

		this.handleCreateAndModify = this.handleCreateAndModify.bind(this);
		this.handleCacheResolve = this.handleCacheResolve.bind(this);
	}

	async handleCreateAndModify(file: TAbstractFile) {
		if (file.path.startsWith("modals/")) {
			const extraData = await this.filesManager.getExtraFileData(
				file
			);
			this.modalsManager.createModal(extraData);
		}
	}

	async handleCacheResolve(file: TAbstractFile) {
		if (file.path.startsWith("modals/")) {
			const extraData = await this.filesManager.getExtraFileData(file);
			this.modalsManager.createModal(extraData);
		}
	}

	async onload() {
    const modalFiles = await this.filesManager.getModalFiles();
    modalFiles.forEach((file) => {
      this.modalsManager.createModal(file);
    });

    // allow modals to be initialized on file create
    this.registerEvent(this.app.vault.on("create", this.handleCreateAndModify));

    // allow modals to be initialized on file edit
    this.registerEvent(this.app.vault.on("modify", this.handleCreateAndModify));

    // initialize modals on file cache resolve for handling startup
    this.registerEvent(this.app.metadataCache.on('resolve', this.handleCacheResolve));

    console.log("Loaded Custom Modals");
	}

	onunload(): void {}
}
