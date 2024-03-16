import Schema from "./Schema.js";

class Card extends Schema {
  constructor() {
    super();
  }

  initComponent() {
    this.$root = this.shadowDOM.querySelector(".root");
  }

  template() {
    return `
        <div class="root ${this.getAttr("class")}">            
          <slot></slot>
        </div>
       `;
  }

  templateCss() {
    return `
      .root {
        overflow: hidden;
        border: 1px solid #134077;
        padding: 15px;
        border-radius: 19px;
        background-color: white;
        display: block;
      }
    `;
  }
}

window.customElements.define("edusogno-card", Card);

export default Card;
