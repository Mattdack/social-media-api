const { connect, connection } = require(`mongoose`);

connect(`mongodb://localhost/socialMediaApi`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;