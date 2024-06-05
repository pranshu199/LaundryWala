import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";

const adminAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, email } = decoded;
    const user = await Users.findById(id);
    if (user) {
      req.id = id;
      req.user = user;
      next();
    } else {
      next("User can not find!");
    }
  } catch (error) {
    next("Authontication failed!");
  }
};

export default adminAuth;
