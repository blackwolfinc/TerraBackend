module.exports = (str) => {
  return str.replace(/<[^>]*>?/gm, '');
};
