const User = require("../../models/user");

module.exports = {
  profile: async (args, req) => {
    console.log("isAuth:", req.isAuth);
    console.log("userId:", req.userId);

    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const user = await User.findById(req.userId).populate("rentedGames");

      if (!user) {
        throw new Error("User not found");
      }

      return {
        ...user._doc,
        password: null,
      };
    } catch (err) {
      throw err;
    }
  },
};
