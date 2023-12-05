const express = require("express");
const { registerUser, loginUser, getUsers, cart, getCart } = require("../userController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../utils/userValidation");
const ensureAuthenticated = require("../utils/ensureAuthenticated");

const routes = express.Router();

routes.get("/", async (req, res) => {
  res.send("<h1>success</h1>");
});

routes.post("/register", registerUserValidation, registerUser);
routes.post("/login", loginUserValidation, loginUser);

routes.get("/users",ensureAuthenticated, getUsers);
routes.post("/cart", cart);
routes.get("/cart", getCart);

module.exports = routes;
