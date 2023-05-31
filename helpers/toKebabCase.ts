const toKebabCase = (s: string) => {
  return s.replace(/([a-z0-9])([A-Z])/g, (match, offset) => {
    return offset > 0 ? "-" : "" + match.toLowerCase();
  });
};

export default toKebabCase;
