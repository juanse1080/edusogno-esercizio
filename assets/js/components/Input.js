import Schema from "./Schema.js";

class Input extends Schema {
  constructor() {
    super();
  }

  getValue() {
    return this.$input.value;
  }

  setValue(value) {
    return this.$input.setAttribute("value", value);
  }

  initComponent() {
    this.$label = this.shadowDOM.querySelector(".form-label");
    this.$input = this.shadowDOM.querySelector(".form-text-input");
  }

  template() {
    return `
      <label 
        class="form-label" 
        ${this.generateAttrTemplate("form", "name")}
      >
        ${this.getAttr("label")}
      </label>
      <input 
        class="form-text-input"
        ${this.generateAttrTemplate("type")}
        ${this.generateAttrTemplate("name")}
        ${this.generateAttrTemplate("placeholder")}
      >       
    `;
  }

  templateCss() {
    return `
      .form-label {
        color: #231F20;
        text-align: center;
        font-family: DM Sans;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: 99.5%;
        display: inline-block;
        margin-bottom: 5px;
      }
      
      .form-text-input,
      .form-text-input:focus {
        width: 100%;
        font-family: DM Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 99.5%;
        outline: none;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px solid #2D224C;
        padding: 5px 5px 5px 0px;
      }

      .form-text-input:placeholder {
        color: #CCCCCC;
      }
      
      .form-text-input:focus {
        outline: 0;
        border-bottom: 1px solid #0057FF;
      }
      
      .form-text-input::placeholder {
        color: #CCCCCC;
      }
    `;
  }

  mapComponentAttributes() {
    this.attributesMapping.push(
      { attr: "placeholder", value: "" },
      { attr: "label", value: "" }
    );

    super.mapComponentAttributes();
  }
}

window.customElements.define("edusogno-input", Input);

export default Input;
