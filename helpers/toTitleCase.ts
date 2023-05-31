const toTitleCase = (s: string) =>
  s.replace(
    /([^\s:\-])([^\s:\-]*)/g,
    (_, firstLetter, remainingLetters) =>
      firstLetter.toUpperCase() + remainingLetters.toLowerCase()
  );

export default toTitleCase;
