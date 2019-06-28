const axios = require('axios');

module.exports = {
  post: (url, headers, data) => 
    axios.post(url, data, { headers }).then(res => res.data)
};