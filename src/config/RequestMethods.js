const Response = {
  status: (statusCode = 0) => {
    return {
      json: (data) => { }
    };
  },
  sendStatus: (statusCode = 0) => { },
}

const Request = {
  body: {},
  params: { id: '' }
}

module.exports = { Response, Request };