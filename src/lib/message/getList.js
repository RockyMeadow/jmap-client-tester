const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = ({ ids }) => {
  const methodCallBody = { accountId, ids  };

  return jmapClient.getMessageList(methodCallBody);
};
