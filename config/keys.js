if (process.env.NODE_ENV === 'production') {
    //in production - return prod set of keys
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}



module.exports = {
    googleClientID: '726741164486-osvt9m7n4ur4orla6d5b5undjl5o4cfi.apps.googleusercontent.com',
    googleClientSecret: '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'
};


