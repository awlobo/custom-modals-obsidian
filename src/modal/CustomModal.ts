import { App, Modal, Notice, Plugin } from "obsidian";
import { CustomModalSettingsInterface } from "./CustomModalSettings";

export interface ObsidianAPI {
  app: App,
  plugin: Plugin,
  Notice: typeof Notice,
}

class CustomModal extends Modal {
	plugin: Plugin;
	customModalSettings: CustomModalSettingsInterface;
  
	constructor(
		plugin: Plugin,
		customModalSettings: CustomModalSettingsInterface
	) {
		super(plugin.app);

		this.plugin = plugin;
		this.customModalSettings = customModalSettings;
	}

	async handleCallFunction(func: any, args: any[]) {
		const isAsync = func.constructor.name === "AsyncFunction";
		if (isAsync) {
			await func(...args);
		} else {
			func(...args);
		}
	}

	renderModal(ctx: any, obsidian: ObsidianAPI) {
		this.titleEl.createEl("span", {
      text: this.customModalSettings.title,
    });

		this.contentEl.createDiv({
			cls: "custom-modal-content",
		})
		// this is not secure, but there is no other way to do it
		.innerHTML = this.customModalSettings.content;

		const okButton = document.createElement("button");
		const okText = document.createTextNode(this.customModalSettings.okText);
		okButton.appendChild(okText);
		okButton.setAttribute("class", "modal-ok-btn");

		const cancelButton = document.createElement("button");
		const cancelText = document.createTextNode(this.customModalSettings.cancelText);
		cancelButton.appendChild(cancelText);
		cancelButton.setAttribute("class", "modal-cancel-btn");

    this.attatchEventListeners(ctx, obsidian, okButton, cancelButton);

		const modalFooter = this.contentEl.createDiv({
			cls: "custom-modal-footer",
		})
		
		modalFooter.appendChild(okButton);
		modalFooter.appendChild(cancelButton);
	}

	attatchEventListeners(ctx: any, obsidian: ObsidianAPI, okButton: HTMLButtonElement, cancelButton: HTMLButtonElement) {
		this.plugin.registerDomEvent(okButton, "click", async () => {
			if (this.customModalSettings.handleOk)
        this.customModalSettings.handleOk(ctx, obsidian);
			this.close();
		});

		this.plugin.registerDomEvent(cancelButton, "click", async () => {
			if (this.customModalSettings.handleCancel)
        this.customModalSettings.handleCancel(ctx, obsidian);
			this.close();
		});
	}

	resetModal() {
		this.clearModalContent();
	}

	clearModalContent() {
		this.titleEl.innerText = "";
		this.contentEl.innerHTML = "";
	}

	async onOpen() {
		const ctx = this.customModalSettings.ctx;
		const obsidian: ObsidianAPI = {
			app: this.app,
			plugin: this.plugin,
			Notice,
		};

		try {
			await this.customModalSettings.preRender(ctx, obsidian)
			this.renderModal(ctx, obsidian);
			this.customModalSettings.postRender(ctx, obsidian);
		} catch(err) {
			console.error(err);
		}
	}

	onClose(): void {
		this.resetModal();
	}
}

export default CustomModal;
