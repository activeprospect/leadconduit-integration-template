module.exports = {
  ui: require('./lib/ui'),
  outbound: {
    handle: require('./lib/outbound/handle'),
    request_response: require('./lib/outbound/request_response')
  }
};
