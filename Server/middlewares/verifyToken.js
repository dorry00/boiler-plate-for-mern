const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(403).json("Invalid token");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("user not authenticated");
  }
};


//authorisation 
const verifyTokenAndAuthorisation = (req,res,next) => {
    verifyToken( req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
          req.user = user
            next()
        }
        else{
            return res.status(401).json("not allowed")
        }
    })

}

//verify that a user is an admin

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken( req, res, () =>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(401).json("You are not an admin")
        }
    })

}


module.exports = { verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorisation };
