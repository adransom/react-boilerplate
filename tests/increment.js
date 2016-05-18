import { expect } from 'chai';
import increment from 'scripts/lib/increment';

describe('#increment', () => {
  it('should increase the value passed by 1', () => {
    const output = increment(1);

    expect(output).to.equal(2);
  });
});
