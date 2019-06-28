const { accountId } = require('../../config/auth');
const uuidv4 = require('uuid/v4');
const jmapClient = require('../jmapClient');

const newMailboxId = uuidv4();

module.exports = name => {
  return jmapClient.setMailboxes({
      accountId,
      create: {
          [newMailboxId]: { name }
      }
  });
};
