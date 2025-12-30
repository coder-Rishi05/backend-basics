// import { User } from "../models/user.model.js";

// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     // basic validation
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All the feild are mandatory !" });
//     }
//     // if user already exist
//     const existingUser = await User.findOne({ email: email.toLowerCase() });

//     if (existingUser)
//       return res.status(400).json({ message: "User already exist!" });
//     // create user
//     const user = await User.create({
//       username,
//       email: email.toLowerCase(),
//       password,
//       loggedIn: false,
//     });

//     res.status(201).json({
//       message: "User registered",
//       user: { id: user._id, email: user.email, username: user.username },
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({
//         message: "Email or username already exists",
//       });
//     }

//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     // check user already exist

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     const user = await User.findOne({
//       email: email.toLowerCase(),
//     }).select("+password");

//     if (!user) return res.status(404).json({ message: "User does not exist" });

//     // checking validation comparing password
//     const isMatch = await user.comparePassword(password);

//     if (!isMatch)
//       return res.status(400).json({
//         message: "credential does not match",
//       });

//     return res.status(200).json({
//       message: "user logged in successfully",
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log("Error in user login : ", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export { registerUser, loginUser };

import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    // Duplicate key error (email or username)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email or username already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user and include password
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Credentials do not match",
      });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });
    if (!email)
      return res.status(404).json({
        message: "user does not exist",
      });

    //
    res.status(200).json({
      message: "User logout sucessfully",
    });
  } catch (error) {
    console.log("Server error : ", error);
    return res.status(500).json({
      message: "getting server error",
    });
  }
};

export { registerUser, loginUser,logoutUser };
