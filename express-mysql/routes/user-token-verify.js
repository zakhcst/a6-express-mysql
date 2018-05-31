
const fs = require("fs");
const util = require("util");
const fileReadPromise = util.promisify(fs.readFile);
const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
 
  let payload;
  const options = {algorithm: "RS256"};

  if (!req.headers.authorization) {
    console.log("req.headers.authorization ", req.headers.authorization);
    return res.status(401).end("Unauthorized request");
  }

  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).end("Unauthorized request");
  }

  return fileReadPromise(process.env.PUBLIC_KEY)
    .then (publicKey => {
      try {
        payload = jwt.verify(token, publicKey, options);
      } 
      catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError" || error.message === "jwt expired") {
          payload = jwt.decode(token, publicKey, options);
          console.error(payload);
          return res.status(440).end("Login Time-out");
        } else {
          return res.status(401).end("Unauthorized request");
        }
      }

      if (!payload) {
        return res.status(401).end("Unauthorized request");
      }
      req.userId = payload.sub;
      next();
    })
    .catch(error => {
      console.error(error);
      res.status(500).end("Server error");
    });
}