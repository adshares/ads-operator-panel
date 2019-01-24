import formatMoney from '../formatMoney';

describe('formatMoney', () => {
  it('should have correct format money', () => {
    const value = 15000000000000;

    expect(formatMoney(value)).toEqual('150.00000000000');
  });

  it('should have correct format negative amount', () => {
    const value = -15000000000000;

    expect(formatMoney(value)).toEqual('-150.00000000000');
  });

  it('should round numbers by precision', () => {
    const value1 = 1507212636377685;
    const value2 = 1507212633377685;
    const value3 = 1500000000000000;
    const value4 = 1;
    const value5 = 7202633377685;
    const value6 = 37899999999984;
    const value7 = 9999999999999;
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
    expect(formatMoney(value6, 4)).toEqual('379.0000');
    expect(formatMoney(value7, 2)).toEqual('100.00');
  });

  it('should round negative amount by precision', () => {
    const value1 = -1507212636377685;
    const value2 = -1507212633377685;
    const value3 = -1500000000000000;
    const value4 = -1;
    const value5 = -7202633377685;
    const value6 = -37899999999984;
    const value7 = -9999999999999;
    expect(formatMoney(value1, 0)).toEqual('-15,072.13');
    expect(formatMoney(value1, 1)).toEqual('-15,072.13');
    expect(formatMoney(value1, 4)).toEqual('-15,072.1264');
    expect(formatMoney(value1, 11)).toEqual('-15,072.12636377685');
    expect(formatMoney(value2, 4)).toEqual('-15,072.1263');
    expect(formatMoney(value2, 11)).toEqual('-15,072.12633377685');
    expect(formatMoney(value3, 4)).toEqual('-15,000.0000');
    expect(formatMoney(value3, 11)).toEqual('-15,000.00000000000');
    expect(formatMoney(value3, 12)).toEqual('-15,000.000000000000');
    expect(formatMoney(value4, 10)).toEqual('-0.0000000000');
    expect(formatMoney(value4, 11)).toEqual('-0.00000000001');
    expect(formatMoney(value5, 11)).toEqual('-72.02633377685');
    expect(formatMoney(value6, 4)).toEqual('-379.0000');
    expect(formatMoney(value7, 2)).toEqual('-100.00');
  });

  it('should trim zeros', () => {
    const value = 15000000000000;

    expect(formatMoney(value, 11, true)).toEqual('150.00');
  });

  it('should trim zeros in negative amount', () => {
    const value = -15000000000000;

    expect(formatMoney(value, 11, true)).toEqual('-150.00');
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

  it('should use empty separator for thousand values', () => {
    expect(formatMoney(100000000000, 4, true, '.', '')).toEqual('1.00');
    expect(formatMoney(1000000000000, 4, true, '.', '')).toEqual('10.00');
    expect(formatMoney(10000000000000, 4, true, '.', '')).toEqual('100.00');
    expect(formatMoney(100000000000000, 4, true, '.', '')).toEqual('1000.00');
  });
});
