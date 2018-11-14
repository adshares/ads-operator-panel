export default function(value) {
  const hex = typeof value === 'undefined' ? 0 : value.toString(); // force conversion
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (code !== 0) {
      if (code < 32 || code >= 127) {
        str = '--- non-printable ---';
        break;
      }
      str += String.fromCharCode(code);
    }
  }
  return str.length > 0 ? str : '--- empty ---';
}
