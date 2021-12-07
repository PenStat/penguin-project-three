import { I18NMixin } from '@lrnwebcomponents/i18n-manager/lib/I18NMixin.js';

import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';

export class AnswerBox extends I18NMixin(SimpleColors) {
  static get tag() {
    return 'answer-box';
  }

  constructor() {
    super();
    this.back = false;
    this.status = 'pending';
    this.correctAnswer = '';
    this.showResult = false;
    this.speak = false;
    this.statusIcon = '';
    this.sideToShow = 'front';
    this.userAnswer = '';
    this.t = {
      yourAnswer: 'Your answer',
      checkAnswer: 'Check answer',
      restartActivity: 'Restart activity',
    };
    this.registerLocalization({
      context: this,
      localesPath: new URL('../locales/', import.meta.url).href,
      locales: ['es', 'fr', 'ja'],
    });
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = navigator.language.substring(0, 2); // uses language of the browser
    this.i18store = window.I18NManagerStore.requestAvailability();
    this.speech.lang = this.i18store.lang;
  }

  static get properties() {
    return {
      ...super.properties,
      back: { type: Boolean, reflect: true },
      sideToShow: { type: String, reflect: true, attribute: 'side-to-show' },
      userAnswer: { type: String, attribute: 'user-answer' },
      status: { type: String, reflect: true },
      showResult: { type: Boolean, attribute: 'show-result', reflect: true },
      statusIcon: { type: String, attribute: false },
      speak: { type: Boolean },
    };
  }

  updated(changedProperties) {
    this.dispatchEvent(
      new CustomEvent('statusChange', {
        detail: this.status,
      })
    );
    if (super.updated) {
      super.updated(changedProperties);
      changedProperties.forEach((oldValue, propName) => {
        if (propName === 't') {
          this.i18store = window.I18NManagerStore.requestAvailability();
          this.speech.lang = this.i18store.lang;
        }
      });
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'back') {
        this.sideToShow = this[propName] ? 'back' : 'front';
      }
    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    const btn = this.shadowRoot.querySelector('#check');
    this.shadowRoot
      .querySelector('#answer')
      .addEventListener('keyup', event => {
        if (event.keyCode === 13) {
          event.preventDefault();
          btn.click();
        }
      });
  }

  // Need this instead of .toUpperCase() for i18n
  equalsIgnoringCase(text) {
    return (
      text.localeCompare(this.userAnswer, undefined, {
        sensitivity: 'base',
      }) === 0
    );
  }

  checkUserAnswer() {
    const side = this.back ? 'front' : 'back';
    const comparison = this.shadowRoot
      .querySelector(`[name="${side}"]`)
      .assignedNodes({ flatten: true })[0]
      .querySelector(`[name="${side}"]`)
      .assignedNodes({ flatten: true })[0].innerText;
    // this.speech.text = comparison;
    // window.speechSynthesis.speak(this.speech);
    this.correct = this.equalsIgnoringCase(comparison);
    this.status = this.equalsIgnoringCase(comparison) ? 'correct' : 'incorrect';
    this.showResult = !this.equalsIgnoringCase(comparison);
    // reverse so that it swaps which slot is shown
    this.correctAnswer = !this.back
      ? this.shadowRoot
          .querySelector(`[name="back"]`)
          .assignedNodes({ flatten: true })[0]
          .querySelector(`[name="back"]`)
          .assignedNodes({ flatten: true })[0].innerText
      : this.shadowRoot
          .querySelector(`[name="front"]`)
          .assignedNodes({ flatten: true })[0]
          .querySelector(`[name="front"]`)
          .assignedNodes({ flatten: true })[0].innerText;
    this.shadowRoot.querySelector('#check').disabled = true;
    this.shadowRoot.querySelector('input').disabled = true;
  }

  speakWords() {
    const side = this.back ? 'front' : 'back';
    const comparison = this.shadowRoot
      .querySelector(`[name="${side}"]`)
      .assignedNodes({ flatten: true })[0]
      .querySelector(`[name="${side}"]`)
      .assignedNodes({ flatten: true })[0].innerText;
    this.speech.text = comparison;
    window.speechSynthesis.speak(this.speech);
  }

  // as the user types input, grab the value
  // this way we can react to disable state among other things
  inputChanged(e) {
    this.userAnswer = e.target.value;
  }

  // reset the interaction to the defaults
  resetCard() {
    this.shadowRoot.querySelector('#check').disabled = false;
    this.shadowRoot.querySelector('input').disabled = false;
    this.userAnswer = '';
    this.status = 'pending';
    this.showResult = false;
    this.sideToShow = this.back ? 'back' : 'front';
    this.correctAnswer = '';
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .answer-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 300px;
        border-radius: 20px;
        border: solid 1px gray;
        background-color: var(--simple-colors-default-theme-accent-7);
        padding: 0;
      }
      .answer-section:focus-within {
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
      }
      input {
        border: none;
        padding: 10px;
        font-size: 14px;
        height: 42px;
        border-radius: 19px 0 0 19px;
        margin: 0;
        width: 11em;
      }
      input:focus {
        outline: none;
      }
      button#check {
        background-color: #0a7694;
        color: white;
        font-size: 14px;
        margin: none;
        padding: 14px;
        border-radius: 0 19px 19px 0;
        border: none;
        overflow: hidden;
        width: 50em;
        height: 62px;
      }
      button#retry {
        color: red;
      }
      button:hover {
        opacity: 0.8;
      }
      button:disabled {
        opacity: 0.5;
        background-color: #dddddd;
        color: black;
      }
      p {
        font-family: Helvetica;
        color: var(--simple-colors-default-theme-grey-12);
        font-weight: normal;
        font-size: 20px;
      }
      :host([side-to-show='front']) slot[name='back'] {
        display: none;
      }
      :host([side-to-show='back']) slot[name='front'] {
        display: none;
      }

      :host([status='correct']) simple-icon-lite {
        color: green;
      }
      simple-icon-lite {
        --simple-icon-width: 35px;
        --simple-icon-height: 35px;
        color: red;
        padding-left: 175px;
        padding-top: 10px;
      }

      .sr-only {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div>
        <p id="question">
          <slot name="front" id="front"></slot>
          <slot name="back" id="back"></slot>
        </p>
        ${this.showResult
          ? html` <p>The correct answer is: ${this.correctAnswer}</p> `
          : ``}
      </div>
      <div class="answer-section">
        <input
          id="answer"
          type="text"
          .placeholder="${this.t.yourAnswer}"
          @input="${this.inputChanged}"
          .value="${this.userAnswer}"
        />
        <button
          id="check"
          ?disabled="${this.userAnswer === ''}"
          @click="${this.checkUserAnswer}"
        >
          ${this.t.checkAnswer}
        </button>
      </div>
      <simple-icon-lite
        id="retry"
        icon="refresh"
        @click="${this.resetCard}"
        dark
      ></simple-icon-lite>
      ${this.speak
        ? html` <simple-icon-lite
            icon="../av/volume-up"
            @click="${this.speakWords}"
            dark
          ></simple-icon-lite>`
        : ``}
    `;
  }
}

customElements.define(AnswerBox.tag, AnswerBox);
