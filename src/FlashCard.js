import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';

export class FlashCard extends SimpleColors {
  static get tag() {
    return 'flash-card';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.speak = false;
    this.imgKeyword = '';
    this.imgSrc = '';
    this.back = false;
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
      imgSrc: { type: String, attribute: 'img-src' },
      imgKeyword: { type: String, attribute: 'img-keyword' },
      speak: { type: Boolean },
      back: { type: Boolean },
      status: { type: String, reflect: true },
    };
  }

  // CSS - specific to Lit
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          border: 1px solid var(--simple-colors-default-theme-accent-6);
          min-width: 320px;
          border-radius: 20px;
          padding: 20px;
          width: 5em;
          background-color: var(--simple-colors-default-theme-accent-2);
          box-shadow: 0px 0px 5px var(--simple-colors-default-theme-accent-7);
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
        img-keyword="${this.imgKeyword}"
        status="${this.status}"
      ></image-prompt>
      <answer-box
        ?back=${this.back}
        ?speak=${this.speak}
        @statusChange="${this.statusChanged}"
      >
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
