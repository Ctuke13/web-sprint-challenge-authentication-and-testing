const { findBy } = require("../users/users-model.js");

const checkUsernameExists = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      status: 401,
      message: "username and password required",
    });
  } else {
    try {
      const [existingUser] = await findBy({ username });

      if (existingUser) {
        req.user = existingUser;
        next();
      } else {
        next({
          status: 401,
          message: "invalid credentials",
        });
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = {
  checkUsernameExists,
};
