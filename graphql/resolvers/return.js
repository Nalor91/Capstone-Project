const User = require("../../models/user");
const Rental = require("../../models/rental");

module.exports = {
  returnGame: async ({ gameId }, req) => {

    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const rental = await Rental.findOneAndDelete({
        user: req.userId,
        game: gameId
      });

      if (!rental) {
        throw new Error("Rental not found");
      }
      
      await User.updateOne(
        { _id: req.userId },
        { $pull: { rentedGames: gameId } }
      );

      return {
        _id: rental._id,
        user: req.userId,
        game: gameId,
        returnDate: new Date().toISOString()
      };

    } catch (err) {
      throw err;
    }
  }
};