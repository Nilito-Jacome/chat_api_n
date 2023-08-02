// const Users = require('../models/users.models');
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    await Users.create({ username, email, password: hashed });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    // si el usuario existe devuelve un objeto
    // si no existe devuelve null
    // * truthy, un numero, texto, [], {}, true
    // ! falsy, "", 0, false, null, undefined
    if (!user) {
      return next({
        status: 400,
        errorName: "Invalid credentials",
        error: "incorrect email / password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return next({
        status: 400,
        errorName: "Invalid credentials",
        error: "incorrect email / password",
      });
    }

    // generar un token
    const {
      id,
      username,
      firstname,
      lastname,
      profileImage,
      validEmail,
      createdAt,
      updatedAt,
    } = user;

    const token = jwt.sign(
      { id, username, email, firstname, lastname },
      process.env.JWT_SECRET,
      { algorithm: "HS512", expiresIn: "30m" }
    );

    res.json({
      id,
      username,
      email,
      firstname,
      lastname,
      profileImage,
      validEmail,
      createdAt,
      updatedAt,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const allUsers = async (req, res, next) => {
  try {
    const user = await Users.findAll({
      attributes: ["id", "username"],
    });
    res.json(user);
  } catch(error) {
    next(error);
  }
}

module.exports = {
  allUsers,
  createUser,
  loginUser,
};

// protegiendo endpoints -> autenticando peticiones
