/* eslint-disable */

export default function(value, precision, trim, decimal, thousand) {
  const r = typeof trim === 'undefined' ? false : trim;
  const p = typeof precision === 'undefined' ? 11 : Math.max(precision, 2);
  const d = typeof decimal === 'undefined' ? '.' : decimal;
  const t = typeof thousand === 'undefined' ? ',' : thousand;
  let v = ((value || '0') + '');

  let s = '';
  if (value < 0) {
    s = '-';
    v = v.substr(1);
  }

  v = v.padStart(11, '0');
  const l = v.length - 11;
  let a = v.substr(0, l) || '0';
  const j = a.length > 3 ? a.length % 3 : 0;
  let b = Math.round(
    parseInt((v + '0').substr(l, p + 1)) / 10
    ).toString()
  ;
  if (b.length > p) {
    b = '0';
    a = (parseInt(a) + 1).toString();
  }
  b = b.padStart(p, '0');
  if (r) {
    b = b.replace(/([0-9]{2})0+$/, '$1');
  }

  return (
    s +
    (j ? a.substr(0, j) + t : '') +
    a.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    d +
    b
  );
}
