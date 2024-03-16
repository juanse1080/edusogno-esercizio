import Schema from "./Schema.js";

class Loader extends Schema {
  constructor() {
    super();
  }

  initComponent() {
    this.$root = this.shadowDOM.querySelector(".root");
  }

  template() {
    return `
      <div class="root ${this.getAttr("class")}">
        <span class="spin"></span>
      </div>
    `;
  }

  templateCss() {
    return `
      .root {
        display: inline-block;
      }
      .spin {
        width: 16px;
        height: 16px;
        border: 5px solid #FFF;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: spin 1s linear infinite;
      }     
      
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }      
        100% {
          transform: rotate(360deg);
        }
      }
    `;
  }
}

window.customElements.define("edusogno-loader", Loader);

export default Loader;
