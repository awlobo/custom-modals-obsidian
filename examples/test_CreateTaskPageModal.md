---
title: test_CreateTaskPageModal
okText: "Ok"
cancelText: "Cancel"
---

#### Modal Content
```html
<style>
	.CreateTaskPageModal__form {
		display: flex;
		flex-direction: column;
	}

	.CreateTaskPageModal__form > label {
		display: flex;
		flex-direction: column;
	}
</style>
<form class="CreateTaskPageModal__form">
	<label>
		Task:
		<input type="text" id="task" name="task" placeholder="My Task"/>
	</label>
	<label>
		Path:
		<input type="text" id="path" name="path" placeholder="tasks/mytask.md"/>
	</label>
	<label>
		Description:
		<textarea id="description" placeholder="Take out the trash"></textarea>
	</label>
</form>

```

#### Handle Ok
```javascript

const taskEl = document.getElementById("task");
const pathEl = document.getElementById("path");
const descEl = document.getElementById("description");

// create our task note
obsidian.app.vault.create(pathEl.value, `
---
title: ${taskEl.value}
type: task
description: ${descEl.value}
---
# ${taskEl.value}
- [ ] ${descEl.value}
`);

```

#### Handle Cancel
```javascript



```

### Pre Render
```javascript




```

### Post Render
```javascript



```