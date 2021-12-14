import { html } from 'lit';

import '../Flash-Card.js';

export default {
  title: 'Flashcard',
  component: 'flash-card',
  parameters: { escapeHTML: false },
  argTypes: {
    imgKeyword: { control: 'text' },
    front: { control: 'text' },
    back: { control: 'text' },
    backBool: { control: 'boolean' },
    dark: { control: 'boolean' },
    speak: { control: 'boolean' },
    imgSource: { control: 'text' },
    accentColor: { control: 'text' },
    listen: { control: 'boolean' }
  },
};

function Template({ imgKeyword, front, back, backBool, dark, speak, imgSource, accentColor, listen }) {
  return html`
    <flash-card
      ?back="${backBool}"
      ?dark="${dark}"
      ?speak="${speak}"
      ?listen="${listen}"
      img-keyword="${imgKeyword}"
      img-source="${imgSource}"
      accent-color="${accentColor}"
    >
      <div slot="front">${front}</div>
      <div slot="back">${back}</div>
    </flash-card>
  `;
}
export const FlashCard = Template.bind({});
FlashCard.args = {
  front: 'What is strawberry in Spanish?',
  back: 'fresa',
  speak: true,
  listen: true,
  imgSource: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/1432664914-strawberry-facts1.jpg'
};

export const NoImage = Template.bind({});
NoImage.args = {
  front: 'What is penguin in Spanish?',
  back: 'pinguino',
  speak: true,
  listen: true
}
