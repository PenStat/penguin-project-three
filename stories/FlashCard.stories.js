import { html } from 'lit';

import '../Flash-Card.js';

export default {
  title: 'Flashcard',
  component: 'flash-card',
  parameters: { escapeHTML: false },
  argTypes: {
    status: { control: 'select', options: ['pending', 'correct', 'incorrect'] },
    imageKeyword: { control: 'text' },
    front: { control: 'text' },
    back: { control: 'text' },
    backBool: { control: 'boolean' },
  },
};

function Template({ status, imageKeyword, front, back, backBool }) {
  return html`
    <flash-card
      status="${status}"
      ?back="${backBool}"
      image-keyword="${imageKeyword}"
    >
      <div slot="front">${front}</div>
      <div slot="back">${back}</div>
    </flash-card>
  `;
}
export const FlashCard = Template.bind({});
