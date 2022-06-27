---
title: test_PersistentStateModal
okText: "Ok"
cancelText: "Cancel"
---

#### Modal Content
```html
<style>
	.app {
		height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
</style>

<div className="app">
	<div id="counter">0</div>
	<button id="count-button">Count++</button>
</div>

```

#### Handle Ok
```javascript



```

#### Handle Cancel
```javascript



```

### Pre Render
```javascript

// intialize ctx.count if it doesnt exist
ctx.count = ctx.count || 0;

```

### Post Render
```javascript

const counter = document.querySelector("#counter");

// render initial ctx value
counter.innerText = `${ctx.count}`;

document.querySelector("#count-button")
	.addEventListener("click", () => {
		// increment count
		ctx.count++;

		// render to DOM
		counter
			.innerText = `${ctx.count}`;
	});

```