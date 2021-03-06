const DB = require('../db/db-query.js');
const fs = require('fs');
const util = require('util');
const fileReadPromise = util.promisify(fs.readFile);

const express = require('express');
const router = express.Router();

const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./user-token-verify');

// router.all('*', (req, res, next) => {
//   console.log('User:', req.user);
//   console.log(req.isAutenticated ? req.isAutenticated() : 'Not authenticated');
//   console.log(req.body || 'Not authenticated');
//   next();
// });

router.post('/register', (req, res, next) => {
  const db = new DB();

  // Query for already existing user
  const query = 'SELECT * FROM users WHERE email=?';
  const dataFields = [req.body.email];

  db.query(query, dataFields)
    .then(data => {
      console.log('data:', data);
      if (data.length > 0) {
        return Promise.reject('Email is registered already');
      } else {
        return bcrypt.hash(req.body.password, saltRounds);
      }
    })
    // Store hash in your password DB.
    .then(hash => {
      const query = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
      const dataFields = [req.body.name, req.body.email, hash];
      return db.query(query, dataFields);
    })
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    });
});

router.post('/update', verifyToken, (req, res, next) => {
  const query =
    'UPDATE users SET name=?, roleId=?, active=? WHERE id=? AND email=? AND name=? AND roleId=? AND active=?';

  const { existing, updating } = req.body;
  const dataFields = [
    updating.name,
    updating.roleId,
    updating.active,
    existing.id,
    existing.email,
    existing.name,
    existing.roleId,
    existing.active
  ];
  
  const db = new DB();

  db.query(query, dataFields)
    .then(results => {
      if (results.affectedRows === 0) {
        res.status(409);
      }
      res.json(results);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    })
    .then(() => {
      return db.close().catch(error => {
        console.error(error);
      });
    });
});

router.post('/login', (req, res, next) => {
  let user;
  const query = 'SELECT * FROM users WHERE email=?';
  const dataFields = [req.body.email];
  const db = new DB();

  db.query(query, dataFields)
    .then(results => {
      if (results.length === 1) {
        user = results[0];
        return bcrypt.compare(req.body.password, user.password.toString());
      } else {
        return Promise.reject('Not registered user');
      }
    })
    .then(passwordChecked => {
      if (passwordChecked) {
        return fileReadPromise(process.env.PRIVATE_KEY);
      } else {
        return Promise.reject('Wrong password');
      }
    })
    .then(privateKey => {
      const payload = {
        sub: user.id
      };
      const options = {
        algorithm: 'RS256',
        expiresIn: parseInt(process.env.SESSION_DURATION_SECONDS, 10)
      };

      let sessionExpUTC =
        (Math.floor(Date.now() / 1000) +
          parseInt(process.env.SESSION_DURATION_SECONDS, 10)) *
        1000;
      let token = jwt.sign(payload, privateKey, options);

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        sessionExp: sessionExpUTC,
        accessToken: token
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    })
    .then(() => {
      return db.close().catch(error => {
        console.error(error);
      });
    });
});

// Returns user details for userId set in the token (send from the client in Authorization header)
router.get('/loggedUserDetails', verifyToken, (req, res, next) => {
  const query = 'SELECT id, name, email, roleId, active FROM users WHERE id=?';
  const dataFields = [req.userId];
  const db = new DB();

  db.query(query, dataFields)
    .then(results => res.json(results[0]))
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    })
    .then(() => {
      return db.close().catch(error => {
        console.error(error);
      });
    });
});

// Returns user details for arbitrary user
router.get('/user/:id', verifyToken, (req, res, next) => {
  const query = 'SELECT id, name, email, roleId, active FROM users WHERE id=?';
  const dataFields = [parseInt(req.params.id, 10)];
  const db = new DB();

  db.query(query, dataFields)
    .then(results => res.json(results[0]))
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    })
    .then(() => {
      return db.close().catch(error => {
        console.error(error);
      });
    });
});

router.get('/users', verifyToken, (req, res, next) => {
  const query =
    'SELECT users.id, users.name, users.email, users.created, users.changed, users.active, users.roleId, roles.name AS role FROM users JOIN roles WHERE users.roleId=roles.id';
  // const query = 'SELECT *, roles.name AS role FROM users JOIN roles WHERE users.roleId=roles.id';
  const dataFields = [];
  const db = new DB();

  db.query(query, dataFields)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    })
    .then(() => {
      return db.close().catch(error => {
        console.error(error);
      });
    });
});

router.get('/usersroles', verifyToken, (req, res, next) => {
  const query = 'SELECT id, name FROM roles';
  const dataFields = [];
  const db = new DB();

  db.query(query, dataFields)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).json(error || { message: 'Server error' });
    })
    .then(() => {
      return db.close().catch(error => {
        console.error(error);
      });
    });
});

module.exports = router;
