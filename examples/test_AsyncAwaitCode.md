---
title: test_AsyncAwaitCode
okText: "Ok"
cancelText: "Cancel"
---

#### Modal Content
```html

<div id="cat-fact">Loading...</div>

```

#### Handle Ok
```javascript



```

#### Handle Cancel
```javascript



```

### Pre Render
```javascript
const request = await fetch('https://catfact.ninja/fact');
const response = await request.json();

ctx.catFact = response.fact;
console.log(ctx.catFact);

```

### Post Render
```javascript
console.log(ctx);
document.querySelector("#cat-fact").innerText = ctx.catFact;

```