import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';

export class FlashCardSet extends LitElement {
  static get tag() {
    return 'flash-card-set';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.questions = [];
    this.currentQuestion = 0;
    setTimeout(() => {
      import('./FlashCard.js');
    }, 0);
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      questions: {
        type: Array,
      },
    };
  }

  updated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.renderTags();
    this.shadowRoot.querySelector('.arrow-left').addEventListener('click', () => {
      if (this.currentQuestion > 0) {
        this.currentQuestion-=1;
        this.changeVisible();
      }
    });
    this.shadowRoot.querySelector('.arrow-right').addEventListener('click', () => {
      if (this.currentQuestion < this.questions.length/2-1) {
        this.currentQuestion+=1;
        this.changeVisible();
      }
    });
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

  renderTags() {
    this.getData();
    for (let i = 0; i < this.questions.length; i += 2) {
      this.formatEl(this.questions[i], this.questions[i + 1], i / 2);
    }
  }

  formatEl(front, back, number) {
    // create a new element
    const el = document.createElement('flash-card');
    el.setAttribute('dark', '');
    el.setAttribute('id', `card${number}`);
    if (number !== 0) {
      el.className = 'hidden';
      // el.setAttribute('style', `display: none;`);
    }
    // add the text
    el.innerHTML = `
      <p slot="front">${front}</p>
      <p slot="back">${back}</p>`;
    // append it to the parent
    this.shadowRoot.querySelector('#content').appendChild(el);
  }

  changeVisible() {
    for (let i = 0; i < this.questions.length; i += 2) {
      const el = this.shadowRoot.querySelector(`#card${i / 2}`);
      if (i / 2 === this.currentQuestion) {
        el.className = 'visible';
        // el.setAttribute('style', `display: block;`);
      } else {
        el.className = 'hidden';
        // el.setAttribute('style', `display: none;`);
      }
    }
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .arrow-right {
        transform: scale(2) translateY(100px) translateX(10px);
      }
      .arrow-left {
        transform: scale(2) translateY(100px) translateX(-10px);
      }
      .visible {
        display: block;
        transform: scale(1);
        transition: all 0.5s ease-in-out;
      }
      .hidden {
        display: none;
        transform: scale(0);
        transition: all 0.5s ease-in-out;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div style='display: inline-flex'>
        <simple-icon-lite icon='arrow-back' class='arrow-left' onclick='${this.changeVisible()}'></simple-icon-lite>
        <div id="content"></div>
        <simple-icon-lite icon='arrow-forward' class='arrow-right'></simple-icon-lite>
      </div>
<!--      <br>-->
<!--      <button>Reset All</button>-->
      <slot style="display: none"></slot>
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
