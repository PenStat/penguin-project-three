import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/a11y-carousel/a11y-carousel.js';

export class FlashCardSet extends LitElement {
  static get tag() {
    return 'flash-card-set';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    setTimeout(() => {
      import('./FlashCard.js');
    }, 0);
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {};
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html``;
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

customElements.define(FlashCardSet.tag, FlashCardSet);
