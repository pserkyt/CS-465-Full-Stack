module.exports = {
    modelBaseDirectory: 'app_server/models', // model dir name
    models: ['**/*.js', '!db.js'], // model matcher
    data: 'data', // data dir
    db: 'mongodb://localhost:27017/travlr' // db
};
