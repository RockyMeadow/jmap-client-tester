const getMailboxes = require('./lib/mailbox/get');
const getMessageList = require('./lib/message/getList');
const getMessage = require('./lib/message/get');
const getCLITable = require('./utils/prettier');

const mailboxPropertyMapping = {
  id: 'Mailbox Id',
  name: 'Name',
  totalEmails: 'Total Emails',
  unreadEmails: 'Unread Emails',
  storageUsed: 'Storage Used'
}

const messagePropertyMapping = {
  id: 'Message Id',
  from: 'From',
  receivedAt: 'Received At',
  subject: 'Subject'
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
  },
  getMessageList: (...arguments) => {
    return getMessageList(arguments).then(res => {      
      const tableHeaders = ['#', 'Message ID'];
      const tableBodyRows = res.ids.map((id, index) => ([index+1, id]));

      return getCLITable(tableHeaders, tableBodyRows);
    })
  },
  getMessage: (id, ...properties) => {
    if (!properties.length) properties = Object.keys(messagePropertyMapping).slice(1);

    return getMessage({id, properties}).then(res => {
      const tableHeaders = ['id', ...properties].map(prop => messagePropertyMapping[prop]); 
      const tableBodyRows = [['id', ...properties].map(property => {
        if (property === 'from') {
          return res.list[0].from[0].email;
        }

        return res.list[0][property];
      })];
            
      return getCLITable(tableHeaders, tableBodyRows);
    })
  }
};

require('make-runnable/custom')({
  printOutputFrame: false
});
