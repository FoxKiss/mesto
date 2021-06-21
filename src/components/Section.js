export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item)
    });
  }

  addItemApp(element) {
    this._container.append(element)
  }

  addItemPrep(element) {
    this._container.prepend(element)
  }
}
