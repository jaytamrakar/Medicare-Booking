import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  console.log(req.body);

  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // check if user is already exist
    if (user) {
      return res.status(400).json({ message: "user already exist." });
    }

    // hash password if user is not a registered user
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    const us = await user.save();

    res
      .status(200)
      .json({ success: true, message: "user successfully created ", user: us });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again... ",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;
    // check if user have registered or not
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    // if user has registered then asign them to the user object
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    //  check if user is exist or not
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }
    // compate password with the hash password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // get token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};
