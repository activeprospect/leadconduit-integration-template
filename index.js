module.exports = {
  ui: require('./lib/ui'),
  inbound: {
    request_response: require('./lib/inbound/request_response')
  },
  outbound: {
    handle_style: require('./lib/outbound/handle'),
    request_response: require('./lib/outbound/request_response')
  }
};
