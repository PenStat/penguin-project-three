import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';

export class FlashCard extends SimpleColors {
  static get tag() {
    return 'flash-card';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    setTimeout(() => {
      import('./AnswerBox.js');
      import('./promptImg.js');
    }, 0);
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      inverted: { type: Boolean },
      imgSrc: { type: String, reflect: true, attribute: 'img-src' },
      status: { type: String, reflect: true },
    };
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  // updated(changedProperties) {
  //   changedProperties.forEach((oldValue, propName) => {
  //   });
  // }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  // firstUpdated(changedProperties) {
  //   if (super.firstUpdated) {
  //     super.firstUpdated(changedProperties);
  //   }
  // }

  // HTMLElement life-cycle, element has been connected to the page / added or moved
  // this fires EVERY time the element is moved
  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  // disconnectedCallback() {
  //   super.disconnectedCallback();
  // }

  // CSS - specific to Lit
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          border: 2px solid var(--simple-colors-default-theme-accent-12);
          min-width: 320px;
          border-radius: 20px;
          padding: 20px;
          width: 5em;
          background-color: var(--simple-colors-default-theme-accent-2);
          box-shadow: 5px 5px 5px var(--simple-colors-default-theme-accent-1);
        }
        p {
          color: var(--simple-colors-default-theme-accent-10);
        }
      `,
    ];
  }

  statusChanged(e) {
    console.log(e);
    this.status = e.detail;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <image-prompt
        img-src="${this.imgSrc}"
        status="${this.status}"
      ></image-prompt>
      <answer-box @statusChange="${this.statusChanged}">
        <div slot="front">
          <slot slot="front" name="front"></slot>
        </div>
        <div slot="back">
          <slot slot="back" name="back"></slot>
        </div>
      </answer-box>
    `;
  }

  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`../lib/flash-card.haxProperties.json`, import.meta.url)
      .href;
  }
}
