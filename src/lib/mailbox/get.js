const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = ({ properties }) => {
  const methodCallBody = { accountId };

  if (Array.isArray(properties) && properties.length > 0) {
    methodCallBody.properties = properties;
  }

  return jmapClient.getMailboxes(methodCallBody);
};
