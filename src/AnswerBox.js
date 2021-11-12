// TODO:
// See updated function below, fix corner button styling gap, add simple colors

import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';

export class AnswerBox extends SimpleColors {

  static get tag() {
    return 'answer-box';
  }

  constructor() {
    super();
    this.front = '';
    this.back = '';
    this.backFirst = false;
  }

  static get properties() {
    return {
      backFirst: { type: Boolean, attribute: "back-first" },
    };
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  // updated(changedProperties) {
  //   changedProperties.forEach((oldValue, propName) => {
  //     console.log(oldValue, propName);
  //     // NEED TO ADD
  //     // Logic for updating the card if it switches to and from back-first
  //   });
  // }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated() {
    // Loop through the lightDOM for our slotted content and then remove slots
    this.querySelectorAll('*').forEach((el) => {
      if (el.hasAttribute('slot')) {
        if (el.getAttribute('slot') === "front") {
          this.front = el.innerHTML;
          this.removeChild(el);
          this.shadowRoot.removeChild(this.shadowRoot.querySelector('#front'));
        }
        if (el.getAttribute('slot') === "back") {
          this.back = el.innerHTML;
          this.removeChild(el);
          this.shadowRoot.removeChild(this.shadowRoot.querySelector('#back'));
        }
      }
    });
    // Set question heading based on back-first
    if (!this.backFirst) {
      this.shadowRoot.querySelector('#question').innerHTML = this.front;
    } else {
      this.shadowRoot.querySelector('#question').innerHTML = this.back;
    }
  }

  // Need this instead of .toUpperCase() for i18n
  equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
  }

  // Use data-correct-answer so that parent elements will be able to
  // know if the answer was correct or incorrect
  // We might need to add an incorrect data attribute not sure yet......
  checkAnswer() {
    const answer = this.shadowRoot.getElementById('answer').value;
    if (!this.backFirst) {
      if (this.equalsIgnoringCase(answer, this.back)) {
        this.setAttribute('data-correct-answer', "");
      } else {
        this.removeAttribute('data-correct-answer');
      }
    }
    if (this.backFirst) {
      if (this.equalsIgnoringCase(answer, this.front)) {
        this.setAttribute('data-correct-answer', "");
      } else {
      this.removeAttribute('data-correct-answer');
      }
    }

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
      button {
        background-color: #19b9e6;
        color: white;
        font-size: 14px;
        margin: unset;
        padding: 14px;
        border-radius: 0 19px 19px 0;
        border: none;
        overflow: hidden;
        width: 50em;
        height: 62px;
      }
      button:hover {
        opacity: .5;
      }
      p {
        font-family: Helvetica;
        color: gray;
        font-weight: normal;
        font-size: 20px;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <slot id="front" name="front"></slot>
      <slot id="back" name="back"></slot>
      <p id="question"></p>
      <div class="answer-section">
        <input name="answer" id="answer" placeholder="Your answer">
        <button @click=${this.checkAnswer}>Check Answer</button>
      </div>
    `;
  }
}

customElements.define(AnswerBox.tag, AnswerBox);
