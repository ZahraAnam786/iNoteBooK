const jwt = require("jsonwebtoken");
const JWT_SECRET = "AnamisgoodG$irl";

//FetchUser is call Authenticate user 
//next is used to execute pendding code Like router.post("/getUser", fetchUser, async (req, res))
const fetchUser = async (req, res, next) => {
  //Get the User from token and add id to user object
  try {
    const jwtToken = req.header("auth_token");
    if (!jwtToken) {
      //Access denied
      res
        .status(401)
        .send({ error: "please authenticate using a valid token" });
    }

    //Decode Token
    var data = jwt.verify(jwtToken, JWT_SECRET);
    req.user = data.user; // Assign to request object for fetch data by id

    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
