import formatMoney from '../formatMoney';

describe('formatMoney', () => {
  it('should have correct format money', () => {
    const value = 15000000000000;

    expect(formatMoney(value)).toEqual('150.00000000000');
  });

  it('should round numbers by precision', () => {
    const value1 = 1507212636377685;
    const value2 = 1507212633377685;
    const value3 = 1500000000000000;
    const value4 = 1;
    const value5 = 7202633377685;
    expect(formatMoney(value1, 0)).toEqual('15,072.13');
    expect(formatMoney(value1, 1)).toEqual('15,072.13');
    expect(formatMoney(value1, 4)).toEqual('15,072.1264');
    expect(formatMoney(value1, 11)).toEqual('15,072.12636377685');
    expect(formatMoney(value2, 4)).toEqual('15,072.1263');
    expect(formatMoney(value2, 11)).toEqual('15,072.12633377685');
    expect(formatMoney(value3, 4)).toEqual('15,000.0000');
    expect(formatMoney(value3, 11)).toEqual('15,000.00000000000');
    expect(formatMoney(value3, 12)).toEqual('15,000.000000000000');
    expect(formatMoney(value4, 10)).toEqual('0.0000000000');
    expect(formatMoney(value4, 11)).toEqual('0.00000000001');
    expect(formatMoney(value5, 11)).toEqual('72.02633377685');
  });

  it('should trim zeros', () => {
    const value = 15000000000000;

    expect(formatMoney(value, 11, true)).toEqual('150.00');
  });

  it('should use `:` separator for decimal values', () => {
    const value = 15000000000000;

    expect(formatMoney(value, 11, true, ':')).toEqual('150:00');
  });

  it('should use `:` separator for thousand values', () => {
    const value = 1507263537768555;

    expect(formatMoney(value, 11, true, '.', ':')).toEqual(
      '15:072.63537768555',
    );
  });
});
