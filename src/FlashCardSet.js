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
    return {
    };
  }

  firstUpdated(changedProperties) {
    this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true }).forEach((el) => {
      if (el.tagName === "FLASH-CARD") {
        //this.shadowRoot.querySelector('a11y-carousel').appendChild(el);
      }
    });
    
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
    return html`
      <a11y-carousel>
        <figure>
          <flash-card>
            <p slot="front">What is strawberry in Spanish</p>
            <p slot="back">fresa</p>
          </flash-card>
        </figure>
        <figure>
          <flash-card>
            <p slot="front">What is blackberry in Spanish</p>
            <p slot="back">mora</p>
          </flash-card>
        </figure>
        <figure>
          <flash-card>
            <p slot="front">What is strawberry in French</p>
            <p slot="back">fraise</p>
          </flash-card>
        </figure>
      </a11y-carousel>
      <a11y-carousel id="demo1" no-prev-next>
        <figure id="figure-1">
          <img src="//placekitten.com/400/200" alt="Random Kitten, 400 X 200">
          <figcaption>Item 1</figcaption>
        </figure>
        <figure id="figure-2">
          <img src="//placekitten.com/300/100" alt="Random Kitten, 300 X 100">
          <figcaption>Item 2</figcaption>
        </figure>
        <figure id="figure-3">
          <img src="//placekitten.com/400/300" alt="Random Kitten, 400 X 300">
          <figcaption>Item 3</figcaption>
        </figure>
      </a11y-carousel>
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

customElements.define(FlashCardSet.tag, FlashCardSet);
