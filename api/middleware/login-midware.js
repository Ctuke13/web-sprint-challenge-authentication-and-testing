const { findBy } = require("../users/users-model.js");

const loginCredentials = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: "username and password required" });
  } else {
    try {
      const [existingUser] = await findBy({ username });

      if (existingUser) {
        req.user = existingUser;
        next();
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } catch (err) {
      next(err);
    }
  }
};

const registerCredentials = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: "username and password required" });
  } else {
    try {
      const [existingUser] = await findBy({ username });
      console.log(existingUser);
      if (existingUser) {
        res.status(422).json({ message: "username taken" });
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = {
  registerCredentials,
  loginCredentials,
};
