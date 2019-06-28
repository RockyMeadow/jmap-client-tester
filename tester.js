const divider = '------------'
const axios = require('axios')
const jmap = require('jmap-client')
const { cookie, token } = require('./auth-info')
const uuidV4 = require('uuid')

const transporter = {
    post: (url, headers, data) => {
        return axios.post(url, data, {
            headers,
        }).then(res => res.data)
    }
}
const client = new jmap.Client(transporter)
    .withAPIUrl('https://www.fastmail.com/jmap/api/?u=cf1940e2')
    .addHeaders({ cookie })
    .withAuthenticationToken(token, 'Bearer')


switch (process.argv[2]) {
    case 'getMailboxes':
        client.getMailboxes({
            accountId: 'ucf1940e2',
            properties: ['name']
        }).then(res => {
            console.log(divider,'Mailboxes',divider)
            res.list.forEach(mailbox => {
                console.log(`${mailbox.id}\t${mailbox.name}`)
            })
        }).catch(err => console.error(err))

        break

    default:
        break;
}