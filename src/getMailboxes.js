const getMailboxes = require('./lib/mailbox/get');
const getCLITable = require('./utils/prettier');

const mailboxPropertyMapping = {
  id: 'Mailbox Id',
  name: 'Name',
  totalEmails: 'Total Emails',
  unreadEmails: 'Unread Emails',
  storageUsed: 'Storage Used'
}

module.exports = {
  getMailboxes: (...arguments) => {
    if (!arguments.length) arguments = Object.keys(mailboxPropertyMapping);

    return getMailboxes({ properties: arguments }).then(res => {
      const tableHeaders = arguments.map(argument => mailboxPropertyMapping[argument]);
      const tableBodyRows = res.list.map(mailbox => arguments.map(key => mailbox[key]));

      return getCLITable(tableHeaders, tableBodyRows);
    })
    .catch(err => console.log(err))
  }
};

require('make-runnable/custom')({
  printOutputFrame: false
});
