// if (process.env.NODE_ENV === 'production') {
//     //in production - return prod set of keys
//     module.exports = require('./prod');
// } else {
//     module.exports = require('./dev');
// }

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};



