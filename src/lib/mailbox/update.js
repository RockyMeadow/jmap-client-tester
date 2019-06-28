const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = mailboxIdToUpdate => {
  return jmapClient.setMailboxes({
    accountId,
    update: {
      [mailboxIdToUpdate]: {
        name: 'This mailbox name has changed'
      }
    }
  });
};
