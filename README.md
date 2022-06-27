# Custom Modals
Custom Modals is an [Obsidian](https://obsidian.md/) plugin that allows you to create powerful customized modals within your notes.

## Getting Started

### Disclaimer
This Plugin runs code that you enter through your notes. Please only run Custom Modal notes from trusted sources and/or review the code prior to running them!

### Concepts
1. All metadata is written in the frontmatter of the note.
2. All code is written in code blocks labelled `html` or `javascript` respectively.
3. The JavaScript functions must be in order of `handleOk` -> `handleCancel` -> `preRender` -> `postRender`. You cannot skip a function.
4. The `preRender` function happens **before** the modal content is renderred, handle side effects like fetching data here.
5. The `postRender` function happens **after** the modal content is renderred, attatch your event listeners and do your other modal content dependant stuff here.
6. Shared state between functions is handled through the `ctx` object passed to each function as the first parameter. It's not advised to store variables in the `window` object due to possible naming collisions with Obsidian's code.

### Your First Custom Modal
Creating a modal is simple, here are the steps:
1. Create a folder named "modals" in the root of your vault.
2. Add a note into that folder.
3. Define your metadata for the Modal in the frontmatter of the note.
	- title: Your Modal title
	- okText: Text of your Ok button
	- cancelText: Text of your Cancel button
4. Write your `HTML` for the Modal Content in a code block with the class name `html`.
5. Write your `handleOk` function in a code block with the class name `javascript`.
6. Write your `handleCancel` function in a code block with the class name `javascript`.
7. Write your `preRender` (if needed) function in a code block with the class name `javascript`.
8. Write your `postRender` (if needed) function in a code block with the class name `javascript`.
9. Run your modal by hitting CTRL + P for Windows, or CMD + P for MacOS and Type "Open YOUR_MODAL_TITLE_HERE".
10. Enjoy your Custom Modal!

### Examples
All examples can be found [here](https://github.com/helloitsian/custom-modals-obsidian/tree/master/examples).
Simply click on the example your want and then click on "Raw" on the top right.
