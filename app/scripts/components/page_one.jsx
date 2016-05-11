import React from 'react';

import { TabContainer, TabPanel } from './tabs';
import Counter from './counter';
import Quotes from './quotes';

export default function PageOne() {
  PageOne.quotes = [
    {
      quote: `
        The information superhighway showed the average person what some
        nerd thinks about Star Trek.
      `,
      cite: 'Homer Simpson',
    },
    {
      quote: 'The human torch was denied a bank loan.',
      cite: 'Ron Burgandy',
    },
    {
      quote: 'Sometimes you eat the bear, and sometimes, well, he eats you.',
      cite: 'The Stranger',
    },
    {
      quote: `
        I'm a deer hunter. I go all the time with my dad. One thing about deer, they have very
        good vision. One thing about me, I am better at hiding than they are at... vision.
      `,
      cite: 'Dwight',
    },
  ];

  return (
    <TabContainer tabs={['Tab 1', 'Tab 2']}>
      <TabPanel>
        <Counter />
      </TabPanel>
      <TabPanel>
        <Quotes quotes={PageOne.quotes} />
      </TabPanel>
    </TabContainer>
  );
}
