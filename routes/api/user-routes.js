const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users. equivalent to SELECT * FROM users; in mysql
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
      attributes: { exclude: ['password'] } //instructed the query to exclude pw column
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1. equivalent to SELECT * FROM users WHERE id = 1;
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// POST /api/users. equivalent to INSERT INTO users function (13.1.6)
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/login', (req, res) => { //post is used instead of get because get carries the request parameter appended in the url string, post carries this req parameter in req.body which is a more secure way of transferring data from client to server
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({ //query user table
    where: {
      email: req.body.email //assigned email entered by user to this value
    }
  }).then(dbUserData => {
    if (!dbUserData) { //if user isn't found, send response to client
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    res.json({ user: dbUserData, message: 'You are now logged in!' });
  });  
});

// PUT /api/users/1. equivalent to update users, set username = x, where id=1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;