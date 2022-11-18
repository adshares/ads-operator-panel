export default function(value) {
  let hex = value === null || typeof value === 'undefined' ? '0' : value;
  hex = hex
    .toString()
    .trim()
    .replace(/^0x/, ''); // force conversion

  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const chars = hex.substr(i, 2);
    const code = parseInt(chars, 16);
    if (code !== 0) {
      if (code !== 10 && code !== 13 && (code < 32 || code >= 127)) {
        str = '--- non-printable ---';
        break;
      }
      str += String.fromCharCode(code);
    }
  }
  return str.length > 0 ? str : '--- empty ---';
}
