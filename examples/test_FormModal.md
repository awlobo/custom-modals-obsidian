---
title: test_FormModal
okText: "Ok"
cancelText: "Cancel"
---

#### Modal Content
```html

<style>
	#greeting-form {
		display: flex;
		flex-direction: column;
	}

	#greeting-form > label {
		display: flex;
		flex-direction: column;
	}
</style>
<form id="greeting-form">
	<label>
		Your name
		<input type="text" id="your-name" name="your-name"/>
	</label>
</form>


```

#### Handle Ok
```javascript

const yourNameEl = document.querySelector("#your-name");
const yourName = yourNameEl.value || "";

// use obsidian's api to notify 
if (yourName)
	new obsidian.Notice(`Hello, ${yourName}!`);

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