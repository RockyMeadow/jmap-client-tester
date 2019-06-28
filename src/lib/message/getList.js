const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = ({ mailboxId }) => {
  const methodCallBody = { accountId, filter: { inMailbox: mailboxId } };
  
  return jmapClient.getMessageList(methodCallBody);
};
