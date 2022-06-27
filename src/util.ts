export const removeNode = (node: HTMLElement | Element) => {
  const parent = node.parentElement;
  parent.removeChild(node);
}