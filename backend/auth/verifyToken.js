import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;
  //   check token is exist or not
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token not found, authorization denied.",
    });
  }
  try {
    // extract only token remove bearer name from auth token
    const token = authToken.split(" ")[1];

    // verify that the token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // extract the information from the decoded token
    req.userId = decoded.id;
    req.role = decoded.role;

    // it must be call before moving to next middleware
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
        error: error.message,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  // extract userId that assing to the req on the previous middleware
  const userId = req.userId;

  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  if (!roles.includes(user.role)) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this",
    });
  } else {
    console.log("vereing user");
  }

  //   if user is authorized then call to the next middleware
  next();
};
