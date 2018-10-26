export const toTitleCase = (phrase, splitChar) =>
  phrase
    .toLowerCase()
    .split(splitChar)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
