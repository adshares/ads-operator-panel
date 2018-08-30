import formatDate from '../formatDate';

describe('formatDate', () => {
  it('should have correct format date', () => {
    const date = '2018-07-07T15:15:15+02:00';

    expect(formatDate(date)).toEqual('2018-07-07 15:15:15');
  });

  it('When there is no seconds it should set 00', () => {
    const date = '2018-07-07T15:15+02:00';

    expect(formatDate(date)).toEqual('2018-07-07 15:15:00');
  });

  it('When there is no seconds it should set 00', () => {
    const date = '2018 07 07';

    expect(formatDate(date)).toEqual(null);
  });
});
