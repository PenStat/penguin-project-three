import { LitElement, html, css } from 'lit';

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

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
        border: 2px solid pink;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <image-prompt><slot name='back'></slot></image-prompt>
      <p><slot name='front'></slot></p>
      <answer-box><slot name='back'></slot></answer-box>
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
