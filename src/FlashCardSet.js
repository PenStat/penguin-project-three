import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/a11y-carousel/a11y-carousel.js';

export class FlashCardSet extends LitElement {
  static get tag() {
    return 'flash-card-set';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.questions = [];
    setTimeout(() => {
      import('./FlashCard.js');
    }, 0);
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      amount: {
        type: Number,
      },
      questions: {
        type: Array,
      },
    };
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  updated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.renderBR();
  }

  renderBR() {
    this.getData();
    console.log(this.questions);
    for (let i = 0; i < this.questions.length; i += 2) {
      console.log(this.questions[i], this.questions[i + 1], i / 2);
      this.formatEl(this.questions[i], this.questions[i + 1], i / 2);
    }
  }

  formatEl(front, back, number) {
    // create a new element
    const el = document.createElement('flash-card');
    el.setAttribute('dark', '');
    el.setAttribute('id', `${number}`);
    // add the text
    el.innerHTML = `
      <p slot="front">${front}</p>
      <p slot="back">${back}</p>`;
    // append it to the parent
    this.shadowRoot.querySelector('#content').appendChild(el);
  }

  getData() {
    const slotData = this.shadowRoot
      .querySelector(`slot`)
      .assignedNodes({ flatten: true })[1]
      .textContent.split('\n');
    for (let i = 0; i < slotData.length; i += 1) {
      while (slotData[i].includes('  ')) {
        slotData[i] = slotData[i].replace('  ', '');
      }
      if (
        slotData[i] !== '' &&
        slotData[i] !== ' ' &&
        slotData[i] !== '\n' &&
        slotData[i] !== '\r' &&
        slotData[i] !== '\t' &&
        slotData[i] !== '        '
      ) {
        this.questions.push(slotData[i]);
      }
    }
  }

  // HTML - specific to Lit
  render() {
    return html`
      <slot style="display: none"></slot>
      <div id="content"></div>
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
