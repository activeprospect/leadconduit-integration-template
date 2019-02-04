module.exports = {
  outbound: {
    handle: require('./lib/outbound/handle'),
    request_response: require('./lib/outbound/request_response')
  }
};
