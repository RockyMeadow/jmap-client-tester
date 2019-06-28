const createMailbox = require('./lib/mailbox/create');
const updateMailbox = require('./lib/mailbox/update');
const deleteMailbox = require('./lib/mailbox/delete');
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
  subject: 'Subject',
  receivedAt: 'Received At'
}

module.exports = {
  createMailbox: name => createMailbox(name).then(res => {
    const tableHeaders = ['Created Mailbox Id'];
    const tableBodyRows = [[res.created[Object.keys(res.created)[0]].id]];

    return getCLITable(tableHeaders, tableBodyRows);
  }),
  updateMailboxName: (id, name) => updateMailbox(id, name).then(res => {
    const tableHeaders = ['Updated Mailbox Id'];
    const tableBodyRows = [[Object.keys(res.updated)[0]]];

    return getCLITable(tableHeaders, tableBodyRows);
  }),
  deleteMailboxes: (...ids) => deleteMailbox(ids).then(res => {
    let result = '';

    if (res.destroyed) {
      const tableHeadersA = ['Deleted Mailbox Ids'];
      const tableBodyRowsA = res.destroyed.map(mailboxId => [mailboxId]);

      result = getCLITable(tableHeadersA, tableBodyRowsA);
    }

    if (res.notDestroyed) {
      const tableHeadersB = ['Not Deleted Mailbox Ids'];
      const tableBodyRowsB = Object.keys(res.notDestroyed).map(mailboxId => [mailboxId]);
   
      if (res.destroyed) result += '\n\n';
      result += getCLITable(tableHeadersB, tableBodyRowsB);
    }

    return result;
  }),
  getMailboxes: (...arguments) => {
    if (!arguments.length) arguments = Object.keys(mailboxPropertyMapping);

    return getMailboxes({ properties: arguments }).then(res => {
      const tableHeaders = arguments.map(argument => mailboxPropertyMapping[argument]);
      const tableBodyRows = res.list.map(mailbox => arguments.map(key => mailbox[key]));

      return getCLITable(tableHeaders, tableBodyRows);
    })
  },
  getMessageList: (...arguments) => {    
    return getMessageList({ mailboxId: arguments[0] }).then(res => {      
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
