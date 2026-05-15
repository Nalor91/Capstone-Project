const Game = require('../../models/game');
const  Rental = require('../../models/rental');
const User = require('../../models/user');

const { transformGame, transformRental } = require('./merge');

module.exports = {
    rental: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const rental = await Rental.find();
            return rental.map(booking => {
                return transformRental(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    rentGame: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        try {
            const fetchedGame = await Game.findById(args.gameId);

            if (!fetchedGame) {
                throw new Error('Game not found.');
            }

            const rent = new Rental({
                user: req.userId,
                game: fetchedGame._id
            });
            const result = await rent.save();

            const user = await User.findById(req.userId);

            user.rentedGames.push(fetchedGame._id);

            await user.save();

            return transformRental(result);
        } catch (err) {
            throw err;
        }
    },
    
    returnGame: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const rental = await Rental.findById(args.rentalId).populate('game');
            const game = transformGame(rental.game);
            await Rental.deleteOne({ _id: args.rentalId });
            return game;
        } catch (err) {
            throw err;
        }
    }
};