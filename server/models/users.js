const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password123', 10),
    role: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('mypassword', 10),
    role: 'user',
  },
];

module.exports = users;
