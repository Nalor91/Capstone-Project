const authResolver = require('./auth');
const gameResolver = require('./games');
const rentalResolver = require('./rental');
const profileResolver = require('./profile');
const returnResolver = require('./return');

const rootResolver = {
    ...authResolver,
    ...gameResolver,
    ...rentalResolver,
    ...profileResolver,
    ...returnResolver
};

module.exports = rootResolver;