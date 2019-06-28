const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = mailboxIdsToDelete => {
  return jmapClient.setMailboxes({
      accountId,
      destroy: mailboxIdsToDelete
  });
};
