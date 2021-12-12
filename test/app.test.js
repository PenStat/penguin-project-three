import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../Flash-Card.js';

describe('FlashCard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<flash-card>
      <p slot="front">What is Bryan in Spanish</p>
      <p slot="back">Bryan</p>
    </flash-card>`);
  });

  it('renders the image-prompt', () => {
    const img = element.shadowRoot.querySelector('image-prompt');
    expect(img).to.exist;
  });

  it('renders the answer-box', () => {
    const ans = element.shadowRoot.querySelector('answer-box');
    expect(ans).to.exist;
  });

  it('renders the question', () => {
    const q = element.querySelector('p[slot="front"]');
    expect(q).to.exist;
  });

  it('read the answer', () => {
    const a = element.querySelector('p[slot="back"]');
    expect(a).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
