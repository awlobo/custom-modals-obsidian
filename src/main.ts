import { Plugin, PluginManifest, App, TAbstractFile } from "obsidian";
import FilesManager from "./filesManager/FilesManager";
import ModalsManager from "./modalsManager/ModalsManager";

export default class CustomModalsPlugin extends Plugin {
	filesManager: FilesManager;
	modalsManager: ModalsManager;
	eventListenerRemoverQueue: [() => void] = [() => {}];

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
		console.log("Loaded Custom Modals");
		// get data of all files
		const allFiles = await this.filesManager.getAllFiles();

		// create modals
		this.modalsManager.createModals(allFiles);

    // allow modals to be initialized on file create
		this.app.vault.on("create", this.handleCreateAndModify);
		this.eventListenerRemoverQueue.push(() => this.app.vault.off("create", this.handleCreateAndModify));

    // allow modals to be initialized on file edit
		this.app.vault.on("modify", this.handleCreateAndModify);
		this.eventListenerRemoverQueue.push(() => this.app.vault.off("modify", this.handleCreateAndModify));

    // initialize modals on file cache resolve for handling startup
    this.app.metadataCache.on('resolve', this.handleCacheResolve);
		this.eventListenerRemoverQueue.push(() => this.app.vault.off("resolve", this.handleCacheResolve));	
	}

	onunload(): void {
		this.eventListenerRemoverQueue.forEach((remover) => remover());
	}
}
