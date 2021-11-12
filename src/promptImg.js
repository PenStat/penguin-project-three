// dependencies / things imported
import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/simple-icon.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement

// which has the magic life-cycles and developer experience below added
export class promptImg extends LitElement {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return 'image-prompt';
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }

      img {
        display: flex;
        margin: auto;
        margin-top: 25px;
        height: 200px;
        width: 275px;
        border: 5px solid white;
        border-radius: 19px;
        box-shadow: 0px 0px 10px black;
      }

      .backgroundbox {
        display: flex;
        background-color: #dceeff;
        color: #dceeff;
        border: 1px #dceeff;
        border-radius: 19px 19px 0px 0px;
        height: 265px;
      }
      simple-icon-lite {
        --simple-icon-height: 50px;
        --simple-icon-width: 50px;
        color: #e9dcff;
      }

      :host([correct]) {
        color: green;
      }
    `;
  }

  // overlay on div tag - wrap image in div & style div
  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    // Take answer and google image return
    this.imgSrc = 'grey box';
    //                                      W   H    Search Term
    this.imgTag = `https://loremflickr.com/320/240/${this.imgSrc}`;
    this.correct = false;
    this.answerIcon = true;
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      imgSrc: { type: String, reflect: true, attribute: 'img-src' },
      imgTag: { type: String },
      correct: { type: Boolean, reflect: true },
      answerIcon: { type: Boolean, reflect: true },
    };
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'correct') {
        this.classList.add('joyful');
      }
    });
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.imgTag = `https://loremflickr.com/320/240/${this.imgSrc}`;
  }

  // HTMLElement life-cycle, element has been connected to the page / added or moved
  // this fires EVERY time the element is moved
  connectedCallback() {
    super.connectedCallback();
  }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div>
        <div class="backgroundbox">
          <img src="${this.imgTag}" alt="default img" />
        </div>
        ${this.answerIcon
          ? html` <simple-icon-lite answerIcon="cancel"></simple-icon-lite>`
          : ``}
      </div>
    `;
  }

  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`../lib/FlashCard.haxProperties.json`, import.meta.url).href;
  }
}
customElements.define(promptImg.tag, promptImg);
