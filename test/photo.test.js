import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/promptImg.js';

describe('FlashCard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<image-prompt></image-prompt>`);
  });

  it('renders a img', () => {
    const h1 = element.shadowRoot.querySelector('img');
    expect(h1).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
