const { accountId } = require('../../config/auth');
const jmapClient = require('../jmapClient');

module.exports = (mailboxIdToUpdate, name) => {
  return jmapClient.setMailboxes({
    accountId,
    update: {
      [mailboxIdToUpdate]: { name }
    }
  });
};
