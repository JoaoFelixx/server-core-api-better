const formatUrl = (url = '', method = '') => {
  const urlFormatted = `${method.toUpperCase()}:${url.toLowerCase()}`;

  return urlFormatted;
}

module.exports = { formatUrl };