import formatMoney from '../formatMoney';

describe('formatDate', () => {
  it('should have correct format date', () => {
    const value = 15000000000000;

    expect(formatMoney(value)).toEqual('150.00000000000');
  });

  it('should trim zeros', () => {
    const value = 15000000000000;

    expect(formatMoney(value, true)).toEqual('150.00');
  });

  it('should use `:` separator for decimal values', () => {
    const value = 15000000000000;

    expect(formatMoney(value, true, ':')).toEqual('150:00');
  });

  it('should use `:` separator for thousand values', () => {
    const value = 1507263537768555;

    expect(formatMoney(value, true, '.', ':')).toEqual('15:072.63537768555');
  });
});
