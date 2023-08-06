const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtKey = process.env.JWT_KEY;

const { TOKEN_LIFESPAN } = require("../constants");

const User = require("../models/user");

const send401Response = (res) => {
  res.status(401).json({
    message: "You have entered an invalid username or password",
  });
};

const getLoginResponseBody = (username, id) => {
  const token = jwt.sign({ username: username, userId: id }, jwtKey, {
    expiresIn: "1h",
  });

  return {
    token: token,
    expiresIn: TOKEN_LIFESPAN,
    userId: id,
  };
};

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(async (hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
    });

    try {
      const result = await user.save();

      res.status(200).json(getLoginResponseBody(req.body.username, result._id));
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({
          message: "Username already exists",
        });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    }
  });
};

exports.login = (req, res) => {
  let fetchedUser;

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) return false;

      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        send401Response(res);
        return;
      }

      res
        .status(200)
        .json(getLoginResponseBody(fetchedUser.username, fetchedUser._id));
    })
    .catch(() => send401Response(res));
};
