const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = ({ id, properties }) => {
  const methodCallBody = { accountId, ids: [id], properties };

  return jmapClient.getMessages(methodCallBody);
};
