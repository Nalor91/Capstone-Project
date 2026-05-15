const Game = require('../../models/game');
const User = require('../../models/user');
const { transformGame } = require('./merge');

module.exports = {
    games: async ({ page=1, limit=10, filter }) => {
        const query = {};

        if(filter) {
            if(filter.genre) {
                query.genre = {$in: [filter.genre] };
            }

            if(filter.difficulty) {
                query.difficulty = filter.difficulty;
            }            

            if (filter.title) {
                query.title = {$regex: filter.title, $options: "i"};
            }
        }
        
        const skip = (page - 1) * limit;

        const games = await Game.find(query)
            .skip(skip)
            .limit(limit);

        const totalGames = await Game.countDocuments();
        const totalPages = Math.ceil(totalGames / limit);

        return {
            games: games.map(game => transformGame(game)),
            pageInfo: {
                currentPage: page,
                totalPages,
                totalGames,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        };
    },
    createGame: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        const game = new Game({
            title: args.gameInput.title,
            description: args.gameInput.description,
            genre: args.gameInput.genre,
            length: args.gameInput.length,
            difficulty: args.gameInput.difficulty,
            players: args.gameInput.players,
            imageUrl: args.gameInput.imageUrl,
            genre: args.gameInput.genre,
            creator: req.userId
        });
        let createdGame;
        try {
            const result = await game.save();
            createdGame = transformGame(result);

            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error('User not found');
            }
            creator.games.push(game);
            await creator.save();
        } catch (err) {
            throw err;
        }
        return createdGame;
    }
};