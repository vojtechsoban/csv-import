import {expect} from 'chai';
import {getMissingColumns} from '../columnService';

describe('Column service', () => {
  it('should combine required and optional columns', () => {
    const actual = getMissingColumns(['r1', 'r2'], ['o1', 'o2'], []);
    expect(actual).to.be.deep.equal(['r1', 'r2', 'o1', 'o2']);
  });
  it('should exclude selected columns', () => {
    const actual = getMissingColumns(['r1', 'r2'], ['o1', 'o2'], ['r2', 'o1']);
    expect(actual).to.be.deep.equal(['r1', 'o2']);
  });
});
