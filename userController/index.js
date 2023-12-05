const UserModel = require("../models/UserModel");
const CartModel = require("../models/CartModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    const userModel = new UserModel(req.body);

    userModel.password = await bcrypt.hash(req.body.password, 10);

    try {
      const response = await userModel.save();
      response.password = undefined;
      return res
        .status(201)
        .json({ message: "Successfully Register", data: response });
    } catch (error) {
      return res.status(500).json({ message: "Error", data: error });
    }

    // res.send("success");
  },

  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Invaild username " });
      }

      const isPassEqual = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPassEqual) {
        return res.status(401).json({ message: "Invaild password" });
      }
      const tokenObject = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      };

      const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
        expiresIn: "4h",
      });
      return res.status(200).json({ jwtToken, tokenObject });
    } catch (error) {
      return res.status(500).json({ message: "Error", data: error });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find({}, { password: 0 });

      return res.json({ data: users });
    } catch (error) {
      return res.status(401).json({ message: "error ", error });
    }
  },
  cart: async (req, res) => {
    const cartModel = new CartModel(req.body);
    try {
      const response = await cartModel.save();
      return res
        .status(201)
        .json({ message: "Added into cart ", data: response });
    } catch (error) {
      return res.status(500).json({ message: "Error", data: error });
    }
  },
  getCart: async (req, res) => {
    try {
      const cart = await CartModel.findOne({ userId:req.body.userId });

      return res.json({ data: cart });
    } catch (error) {
      return res.status(401).json({ message: "error ", error });
    }
  },
};
