import { html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';


export class FlashCardSet extends SimpleColors {
  static get tag() {
    return 'flash-card-set';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.questions = [];
    this.currentQuestion = 0;
    this.cardLength = 4;
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
      if (this.currentQuestion < this.questions.length/4-1) {
        this.currentQuestion+=1;
        this.changeVisible();
      }
    });
  }

  getData() {
    // const slotData = this.shadowRoot
    //   .querySelector(`slot`)
    //   .assignedNodes({ flatten: true })[1]
    //   .textContent.split('\n');
    const slotData2 = this.shadowRoot
      .querySelector(`slot`).assignedNodes({ flatten: true })[1].childNodes;
    // this.cardLength = (this.shadowRoot
    //   .querySelector(`slot`).assignedNodes({ flatten: true })[1].childNodes[1].childNodes.length - 1) / 2;

    // console.log(this.shadowRoot.querySelector(`slot`).assignedNodes({ flatten: true })[1].childNodes);

    const questionData = ['','','',''];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slotData2.length; i++) {
      // console.log(slotData2[i], i, i % 2);
      if (i % 2 === 1) {
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < slotData2[i].childNodes.length; j++) {
          // console.log(slotData2[i]);
          // console.log(slotData2[i].childNodes);
          if (j % 2 === 1) {
            // console.log(slotData2[i].childNodes[j]);
            // console.log(slotData2[i].childNodes[j].slot);
            // console.log(slotData2[i].childNodes[j].innerHTML);
            const {slot} = slotData2[i].childNodes[j];
            if (slot === 'front') {
              // console.log('front');
              questionData[0] = slotData2[i].childNodes[j].innerHTML;
            }
            if (slot === 'back') {
              // console.log('back');
              questionData[1] = slotData2[i].childNodes[j].innerHTML;
            }
            if (slot === 'image') {
              // console.log('image');
              questionData[2] = slotData2[i].childNodes[j].innerHTML;
            }
            if (slot === 'attributes') {
              // console.log('tags');
              questionData[3] = slotData2[i].childNodes[j].innerHTML;
            }
            // console.log(slotData2[i].childNodes[j].childNodes);
          }
        }
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < questionData.length; k++) {
          this.questions.push(questionData[k]);
        }
        // eslint-disable-next-line no-plusplus
        for (let l = 0; l < 4; l++) {
          questionData[l] = '';
        }
      }
    }
  }

  renderTags() {
    this.getData();
    for (let i = 0; i < this.questions.length; i += this.cardLength) {
      this.formatEl(i / this.cardLength, this.questions[i],
        this.questions[i + 1], this.questions[i + 2], this.questions[i + 3]);
    }
  }

  formatEl(number) {
    // console.log(this.currentQuestion, this.questions, this.cardLength);
    // create a new element
    const el = document.createElement('flash-card');
    // el.setAttribute('dark', '');
    el.setAttribute('id', `card${number}`);
    if (number !== 0) {
      el.className = 'hidden';
      // el.setAttribute('style', `display: none;`);
    }
    // add the text
    el.innerHTML = `
      <p slot="front">${arguments[1]}</p>
      <p slot="back">${arguments[2]}</p>`;
    // eslint-disable-next-line prefer-rest-params
    el.setAttribute('img-src', arguments[3]);
    // eslint-disable-next-line prefer-rest-params
    if (arguments[4].includes('speak')) {
      el.setAttribute('speak', '');
    }
    // eslint-disable-next-line prefer-rest-params
    if (arguments[4].includes('dark')) {
      el.setAttribute('dark', '');
    }
    // eslint-disable-next-line prefer-rest-params
    if (arguments[4].includes('back')) {
      el.setAttribute('back', '');
    }
    // append it to the parent
    this.shadowRoot.querySelector('#content').appendChild(el);
  }

  changeVisible() {
    for (let i = 0; i < this.questions.length; i += this.cardLength) {
      const el = this.shadowRoot.querySelector(`#card${i / this.cardLength}`);
      if (i / this.cardLength === this.currentQuestion) {
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
        transform: scale(1);
        display: block;
        transition: all 1s ease-in-out;
        top: 0;
        left: 0;
      }
      .hidden {
        transform: scale(0);
        display: none;
        transition: all 1s ease-in-out;
        top: 0;
        left: 0;
      }
      #content {
        position: relative;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div id='container'>
        <div style='display: inline-flex'>
          <simple-icon-lite icon='arrow-back' class='arrow-left' onclick='${this.changeVisible()}'></simple-icon-lite>
          <div id="content"></div>
          <simple-icon-lite icon='arrow-forward' class='arrow-right'></simple-icon-lite>
        </div>
        <!--      <br>-->
        <!--      <button>Reset All</button>-->
        <slot style="display: none"></slot>
      </div>
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
