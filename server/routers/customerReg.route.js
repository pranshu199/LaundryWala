import express from "express";
import multer from "multer";
import Customers from "../models/customer.model.js";
const router = express.Router();
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE CUSTOMER
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Customers.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "Already registered." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/customers/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newCustomer = new Customers({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          address: req.body.address,
        });
        await newCustomer.save().then((user) => {
          // res.json({ data, message: "Registration successfull." });
          const payload = {
            id: user._id,
            email: user.email,
          };

          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "7d",
          });

          return res.status(200).send({
            success: true,
            message: "Registration successfull.",
            token: "Bearer " + token,
            id: user._id,
            name: user.name,
          });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

export default router;
