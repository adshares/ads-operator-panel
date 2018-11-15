/* eslint-disable */

export default function(value, precision, trim, decimal, thousand) {
  const r = typeof trim === 'undefined' ? false : trim;
  const p = typeof precision === 'undefined' ? 11 : Math.max(precision, 2);
  const d = typeof decimal === 'undefined' ? '.' : decimal;
  const t = typeof thousand === 'undefined' ? ',' : thousand;
  let v = value;

  v = ((v || '0') + '').padStart(11, '0');
  const l = v.length - 11;
  const a = v.substr(0, l) || '0';
  const j = a.length > 3 ? a.length % 3 : 0;
  let b = Math.round(parseInt((v + '0')
    .substr(l, p + 1)) / 10)
    .toString()
    .padStart(p, '0')
  ;
  if (r) {
    b = b.replace(/([0-9]{2})0+$/, '$1');
  }

  return (
    (j ? a.substr(0, j) + t : '') +
    a.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    d +
    b
  );
}
