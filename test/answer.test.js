import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import('../src/AnswerBox.js');

describe('FlashCard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<answer-box></answer-box>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
