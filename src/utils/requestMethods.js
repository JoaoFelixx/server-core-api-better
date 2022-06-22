const Response = {
  status: (statusCode) => {
    return {
      json: (data) => { }
    };
  },
  sendStatus: (statusCode) => { },
}

module.exports = { Response };