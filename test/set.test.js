import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/FlashCardSet.js';

describe('FlashCard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<flash-card-set>
      <ul>
        <li>
          <p slot="front">What is strawberry in Spanish?</p>
          <p slot="back">fresa</p>
          <p slot="image">https://loremflickr.com/320/240/strawberry</p>
        </li>
        <li>
          <p slot="image">https://loremflickr.com/320/240/food</p>
          <p slot="attributes">speak</p>
          <p slot="front">What is food in Spanish?</p>
          <p slot="back">comida</p>
        </li>
        <li>
          <p slot="back">persona</p>
          <p slot="front">What is people in Spanish?</p>
          <p slot="image">https://loremflickr.com/320/240/manequin</p>
          <p slot="attributes">speak dark</p>
        </li>
      </ul>
    </flash-card-set>`);
  });

  it('renders the first flash-card', () => {
    const card = element.shadowRoot.querySelector('flash-card');
    expect(card).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
