class Schema extends HTMLElement {
  constructor() {
    super();
    this.attributesMapping = [
      { attr: "class", value: "" },
      { attr: "classes", value: "" },
    ];
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  disconnectedCallback() {
    this.remove();
  }

  connectedCallback() {
    this.mapComponentAttributes();
    this.render();
    this.initComponent();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        ${this.templateCss()}
        ${this.attributes.classes.value}
      </style>
      ${this.template()}
    `;
  }

  mapComponentAttributes() {
    this.attributesMapping.forEach(({ attr, value }) => {
      if (!this.attributes[attr]) {
        this.attributes[attr] = { value };
      }
    });
  }

  templateCss() {}
  template() {}
  initComponent() {}

  isValidAttr(attr) {
    return (
      (!!this.attributes[attr]?.value &&
        !["null", "undefined"].includes(this.attributes[attr].value)) ||
      false
    );
  }

  getAttr(attr) {
    if (this.isValidAttr(attr)) return this.attributes[attr].value;
    return "";
  }

  getAttrValue(attr) {
    return this.attributes[attr].value;
  }

  generateAttrTemplate(attrName, attr = attrName) {
    return `${attrName}="${this.getAttr(attr)}"`;
  }

  renderIf(condition, template) {
    return condition ? template : "";
  }

  renderIfValidAttr(attr, template) {
    const isValid = this.isValidAttr(attr);
    return this.renderIf(isValid, template);
  }
}

export default Schema;
