const DataLoader = require('dataloader');

const Game = require('../../models/game');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const gameLoader = new DataLoader(gameIds => {
    return games(gameIds);
});

const userLoader = new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } });
});

const games = async (gameIds) => {
    try {
        const games = await Game.find({ _id: { $in: gameIds } });
        return games.map(game => {
            return {
                ...game._doc,
                _id: game._id.toString()
            };
        });
    } catch (err) {
        throw err;
    }
};

const singleGame = async (gameId) => {
    try {
        const game = await gameLoader.load(gameId.toString());
        return {
            ...game._doc,
            _id: game._id.toString()
        };
    } catch (err) {
        throw err;
    }
};

const user = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user._id.toString(),
            createdAt: dateToString(user.createdAt),
            updatedAt: dateToString(user.updatedAt)
        };
    } catch (err) {
        throw err;
    }
};

const transformGame = (game) => {
    return {
        ...game._doc,
        _id: game.id.toString(),
        creator: user.bind(this, game.creator)
    };
};

const transformRental = (rental) => {
    return {
        ...rental._doc,
        _id: rental.id.toString(),
        user: () => user(rental._doc.user),
        game: () => gameLoader.load( rental._doc.game.toString()),
        rentalDate: rental.createdAt.toISOString(),
        returnDate: dateToString(rental._doc.returnDate)
    };
};

exports.transformGame = transformGame;
exports.transformRental = transformRental;

