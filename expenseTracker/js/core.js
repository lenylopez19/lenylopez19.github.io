export function generateElement(obj) {
    const { tag, type, id, value, classes, textContent, imgUrl } = obj;
    const newElement = document.createElement(tag);
    if (type) newElement.type = type;
    if (value) newElement.value = value;
    if (id) newElement.setAttribute("id", id);
    if (textContent) newElement.innerText = textContent;
    if (imgUrl) newElement.setAttribute("src",imgUrl);
    if (classes) {
      for (const _class of classes) {
        newElement.classList.add(_class);
      }
    }
    return newElement;
  }
