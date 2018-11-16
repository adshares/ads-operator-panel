import decodeMessage from '../decodeMessage';

describe('decodeMessage', () => {
  it('Should decode ASCII', () => {
    expect(decodeMessage('74657374')).toEqual('test');
    expect(
      decodeMessage(
        '202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e',
      ),
    ).toEqual(
      ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    );
  });

  it('Should return --- non-printable --- when value is not ASCII', () => {
    expect(decodeMessage('123456')).toEqual('--- non-printable ---');
    expect(decodeMessage('0x123456')).toEqual('--- non-printable ---');
  });

  it('Should return --- empty --- when hex is equal 0', () => {
    let t;
    expect(decodeMessage(t)).toEqual('--- empty ---');
    expect(decodeMessage(null)).toEqual('--- empty ---');
    expect(decodeMessage('')).toEqual('--- empty ---');
    expect(decodeMessage(0)).toEqual('--- empty ---');
    expect(decodeMessage('0')).toEqual('--- empty ---');
    expect(decodeMessage('00000000000')).toEqual('--- empty ---');
    expect(decodeMessage('0x0')).toEqual('--- empty ---');
  });
});
