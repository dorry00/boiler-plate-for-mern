const User = require("../models/User")

const auth = async (req, res, next) => {
    try {
      const authHeader = req.header.token
      const token = authHeader.split(" ")[1]

      User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user)
          return res.json({
            isAuth: false,
            error: true
          });


    
  }