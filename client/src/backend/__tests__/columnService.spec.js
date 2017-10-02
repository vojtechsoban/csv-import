import {expect} from 'chai';
import {getAvailableColumns, getAssignedColumnTypes} from '../columnService';


describe('Column service module', () => {

  describe('getAvailableColumns', () => {

    let columns, assignedColumns;

    beforeEach(() => {
      columns = [
        {type: 'amount', required: true},
        {type: 'clearanceDate', required: false}
      ];
      assignedColumns = [{type: null}, {type: null}];
    });

    it('should build all available columns', () => {
      const actual = getAvailableColumns(columns);
      expect(actual)
        .to
        .be
        .deep
        .equal([{text: 'amount', value: 'amount'}, {text: 'clearanceDate', value: 'clearanceDate'}]);
    });

    it('should build remaining columns when some column are already assinged', () => {
      const assingedColumnTypes = ['amount'];
      const actual = getAvailableColumns(columns, assingedColumnTypes);
      expect(actual).to.be.deep.equal([{text: 'clearanceDate', value: 'clearanceDate'}]);
    });
  });

  describe('getAssignedColumnTypes', () => {
    it('should process all columns unassigned', () => {
      const actual = getAssignedColumnTypes([{type: null}]);
      expect(actual).to.deep.equal([]);
    });

    it('should process all columns assigned', () => {
      const actual = getAssignedColumnTypes([{type: 'c1'}, {type: 'c2'}]);
      expect(actual).to.deep.equal(['c1', 'c2']);
    });

    it('should process some columns assigned and some columns unassigned', () => {
      const actual = getAssignedColumnTypes([{type: 'c1'}, {type: null}]);
      expect(actual).to.deep.equal(['c1']);
    });

  });

});
