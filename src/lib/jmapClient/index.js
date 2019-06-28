const jmap = require('jmap-client');
const transport = require('./transport');
const { jmapAPIUrl, cookie, token } = require('../../config/auth');

module.exports = new jmap.Client(transport)
  .withAPIUrl(jmapAPIUrl)
  .withAuthenticationToken(token, 'Bearer')
  .addHeaders({ cookie });
