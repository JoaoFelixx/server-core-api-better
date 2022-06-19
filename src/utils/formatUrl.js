const formatUrl = (url = '', method = '') => {
  const urlFormatted = `${url.toLowerCase()}:${method.toUpperCase()}`;

  return urlFormatted;
}

module.exports = { formatUrl };