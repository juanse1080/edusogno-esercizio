import Schema from "./Schema.js";

class Alert extends Schema {
  constructor() {
    super();
  }

  initComponent() {
    this.$root = this.shadowDOM.querySelector(".root");
  }

  template() {
    return `
      <div
        class="root ${this.getAttr("class")}" 
      >        
        <slot></slot>
      </div>
    `;
  }

  templateCss() {
    const colors = {
      error: "red",
      success: "green",
      info: "blue",
    };

    return `
      .root {
        display: block;
        padding: 20px;
        border-radius: 19px;
        background-color: ${colors[this.getAttrValue("color")]};
        color: white;          
        font-size: 20px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        font-family: "DM Sans", sans-serif !important;
        margin-bottom: 20px;
      }          
    `;
  }

  mapComponentAttributes() {
    this.attributesMapping.push({ attr: "color", value: "info" });

    super.mapComponentAttributes();
  }
}

window.customElements.define("edusogno-alert", Alert);

export default Alert;
