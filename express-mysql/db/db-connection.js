const mysql = require("mysql");

module.exports = function() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    // optional:
    // debug: true
    // socketPath: process.env.DB_SOCKETPATH // Apple Mac network issues
  });
  
  connection.on("error", error => {
    console.error("MySQL on error", error);
  });

  connection.connect(error => {
    if (error) console.error("MySQL on connect error", error);
  });
  return connection;
};
