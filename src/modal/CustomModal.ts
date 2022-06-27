import { Modal, Notice, Plugin } from "obsidian";
import { removeNode } from "src/util";
import { CustomModalSettingsInterface } from "./CustomModalSettings";

class CustomModal extends Modal {
	plugin: Plugin;
	customModalSettings: CustomModalSettingsInterface;
	eventListenerRemoverQueue: [() => void] = [() => {}];

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

	renderModal() {
		const titleTextNode = document.createTextNode(this.customModalSettings.title);
		this.titleEl.appendChild(titleTextNode)

		this.contentEl.createEl("style", { 
			text: `
				.custom-modal-content {
					padding: 2em;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.custom-modal-footer {
					display: flex;
					justify-content: flex-end;
				}
			` 
		})

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

		const modalFooter = this.contentEl.createDiv({
			cls: "custom-modal-footer",
		})
		
		modalFooter.appendChild(okButton);
		modalFooter.appendChild(cancelButton);
	}

	attatchEventListeners(ctx: any, obsidian: any) {
		const okButton = this.contentEl.querySelector(".modal-ok-btn");
		const cancelButton = this.contentEl.querySelector(
			".modal-cancel-btn"
		);

		const okButtonEventListener: [string, () => {}] = ["click", async () => {
			if (this.customModalSettings.handleOk)
        this.customModalSettings.handleOk(ctx, obsidian);
			this.close();
		}]
		okButton.addEventListener(...okButtonEventListener);
		// add closure to clean up event listeners
		this.eventListenerRemoverQueue.push(() => okButton.removeEventListener(...okButtonEventListener));

		const cancelButtonEventListener: [string, () => {}] = ["click", async () => {
			if (this.customModalSettings.handleCancel)
        this.customModalSettings.handleCancel(ctx, obsidian);
			this.close();
		}]
		cancelButton.addEventListener(...cancelButtonEventListener);
		// add closure to clean up event listeners
		this.eventListenerRemoverQueue.push(() => cancelButton.removeEventListener(...cancelButtonEventListener));
	}

	resetModal() {
		this.clearModalContent();
		this.removeEventListeners();
	}

	clearModalContent() {
		this.titleEl.innerText = "";
		this.contentEl.innerHTML = "";
	}

	removeEventListeners() {
		this.eventListenerRemoverQueue.forEach((remover) => remover());
	}

	async onOpen() {
		const ctx = this.customModalSettings.ctx;
		const obsidian = {
			app: this.app,
			plugin: this.plugin,
			Notice,
		};

		try {
			await this.customModalSettings.preRender(ctx, obsidian)
			this.renderModal();
			this.attatchEventListeners(ctx, obsidian);
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
