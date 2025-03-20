const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/users');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};

const protectedData = (req, res) => {
  res.status(200).json({ message: 'Acceso concedido', user: req.user });
};

module.exports = { login, protectedData };
