import Schema from "./Schema.js";

class Event extends Schema {
  constructor() {
    super();
  }

  initComponent() {
    this.$root = this.shadowDOM.querySelector(".root");
    this.$title = this.shadowDOM.querySelector(".title");
    this.$event_date = this.shadowDOM.querySelector(".event-date");
    this.$button = this.shadowDOM.querySelector(".event-button");
  }

  template() {
    return `
        <edusogno-card
          class="event-root" 
          classes="${this.sharedClasses}"
        >
          <h5 class="title">
            ${this.getAttr("title")}
            <a 
              class="event-edit" 
              href="/edit-event?id=${this.getAttrValue("key")}"
            >
              ${this.renderIf(
                this.getAttrValue("edit") === "true",
                `                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>                  
                `
              )}
            </a>       
          </h5>

          ${this.renderIf(
            this.getAttrValue("added") === "true",
            `<span class="event-chip">Added</span>`
          )}

          ${this.renderIfValidAttr(
            "description",
            `<p class="description">${this.getAttr("description")}</p>`
          )}

          <span class="event-date">${this.getAttr("event_date")}</span>

          ${this.renderIf(
            this.getAttrValue("action") === "true",
            `<edusogno-button
              class="event-button" 
              classes="${this.sharedClasses}"
            >
              JOIN
            </edusogno-button>`
          )}           
        </edusogno-card>
       `;
  }

  templateCss() {
    this.sharedClasses = `
      .event-root {
        display: flex;
        flex-direction: column;
        height: calc(100% - 30px);
      }
      .event-button {
        margin-top: 10px;
      }
    `;

    return `
      .title {
        margin: 0;          
        font-size: 20px;
        font-weight: 700;
        line-height: 36px;
        letter-spacing: 0em;
        margin-bottom: 13px;
      }
      .description {
        font-size: 18px;
        margin: 0;
        margin-bottom: 10px;
      }
      .event-date {        
        flex-grow: 1;  
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        color: #CCCCCC;
      }
      .event-chip {
        display: inline-block;
        padding: 2px 8px;
        width: min-content;
        background-color: green;
        border-radius: 25px;
        margin-bottom: 10px;
        color: white; 
        font-size: 12px;
      }
      .event-edit {
        margin-left: 10px;
      }
    `;
  }

  mapComponentAttributes() {
    this.attributesMapping.push(
      { attr: "title", value: "" },
      { attr: "event-date", value: "" },
      { attr: "description", value: "" },
      { attr: "action", value: "false" },
      { attr: "added", value: "false" }
    );

    super.mapComponentAttributes();
  }

  static get observedAttributes() {
    return ["action", "added"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    let htmlElement;
    switch (name) {
      case "action":
        htmlElement = this.shadowDOM.querySelector(".event-button");

        if (newValue === "true" && !htmlElement)
          this.$event_date?.insertAdjacentHTML(
            "afterend",
            `<edusogno-button
              class="event-button" 
              classes="${this.sharedClasses}"
            >
              JOIN
            </edusogno-button>`
          );
        else if (newValue === "false") htmlElement?.remove();
        break;

      case "added":
        htmlElement = this.shadowDOM.querySelector(".event-button");

        if (newValue === "true" && !htmlElement)
          this.$title?.insertAdjacentHTML(
            "afterend",
            `<span class="event-chip">Added</span>`
          );
        else if (newValue === "false") htmlElement?.remove();
        break;

      default:
        break;
    }
  }
}

window.customElements.define("edusogno-event", Event);

export default Event;
