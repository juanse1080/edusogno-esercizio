import Schema from "./Schema.js";

class Button extends Schema {
  constructor() {
    super();
  }

  initComponent() {
    this.$root = this.shadowDOM.querySelector(".root");
    if (this.attributes.disabled.value === "true") this.$root.disabled = true;
  }

  template() {
    return `
      <button 
        class="root ${this.getAttr("class")}" 
        ${this.generateAttrTemplate("type")}
      >
        ${this.renderIf(
          this.getAttrValue("loading") === "true",
          `<edusogno-loader 
              class="loader" 
              classes="${this.sharedClasses}"
            ></edusogno-loader>`
        )}
        <slot></slot>
      </button>
    `;
  }

  templateCss() {
    this.sharedClasses = `
      .loader {
        margin-right: 10px;
      } 
    `;

    return `
      .root {
        display: block;
        padding: 10px;
        border-radius: 11px;
        background-color: #0057FF;
        border: none;
        width: 100%;
        color: white;          
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        cursor: pointer;
        text-transform: uppercase;
        font-family: "DM Sans", sans-serif !important;
      }
      .root:disabled {
        cursor: not-allowed;
        opacity: 0.5
      }        
    `;
  }

  mapComponentAttributes() {
    this.attributesMapping.push(
      { attr: "type", value: "button" },
      { attr: "loading", value: "false" },
      { attr: "disabled", value: "false" }
    );

    super.mapComponentAttributes();
  }

  static get observedAttributes() {
    return ["loading"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    const loader = this.shadowDOM.querySelector(".loader");

    if (name === "loading" && newValue === "true" && !loader)
      this.$root.insertAdjacentHTML(
        "afterbegin",
        `<edusogno-loader 
            class="loader" 
            classes="${this.sharedClasses}"
          ></edusogno-loader>`
      );
    else if (name === "loading" && newValue === "false")
      this.shadowDOM.querySelector(".loader")?.remove();
  }
}

window.customElements.define("edusogno-button", Button);

export default Button;
