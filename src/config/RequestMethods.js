const Response = {
  status: (statusCode = 0) => {
    return {
      json: (data) => { }
    };
  },
  json: () => {},
  sendStatus: (statusCode = 0) => { },
}

const Request = {
  body: {},
  params: { id: '' }
}

module.exports = { Response, Request };