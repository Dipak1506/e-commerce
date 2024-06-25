const dbConnect = require("../models/dbConnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const data = require("../data/data");
const errorLogger = require("../data/errorLogger");

class UserController {
  static async getUserDb() {
    const db = new dbConnect();
    await db.connectToDb();
    return db;
  }

  static async signToken(obj) {
    return jwt.sign(obj, data.getSecretKey(), { expiresIn: "600" });
  }

  static async registerUser(userObject) {
    const db = await this.getUserDb();
    try {
      console.log("registering user...", userObject);
      const user = await db.queryDb(`SELECT * FROM users WHERE email = $1`, [
        userObject.email,
      ]);

      if (user.length === 0) {
        userObject.userRole = "user";
        const { name, email, password } = userObject;
        
        // Hashing the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserting the user data along with the hashed password
        const newUser = await db.insertUserData("users", {
          name,
          email,
          password: hashedPassword,
          userRole: userObject.userRole,
        });
        const token = await this.signToken({ user: newUser });
        return {
          isSuccessful: true,
          message: "User registration successful",
          user: {
            email: email,
            name: name,
          },
          token: token,
        };
      } else {
        return {
          isSuccessful: false,
          message: "Action Failed. Email Already Exist",
        };
      }
    } catch (error) {
      errorLogger.constructDetailedError(
        "userController.js",
        "registerUser",
        error
      );
      return {
        isSuccessful: false,
        message: "Server error",
      };
    } finally {
      db.closeConnection();
    }
  }

  static async loginUser(email, password) {
    const db = await this.getUserDb();
    try {
      const user = await db.queryDb(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);

      console.log("USER IS ", user[0]);

      if (user.length === 1) {
        const isValidPassword = await bcrypt.compare(password, user[0].password);
        console.log("-----"+isValidPassword);
        if (isValidPassword) {
          const token = await this.signToken({ user: user[0] });
          console.log("TOKEN IS ", token);
          console.log(user[0].name + " has logged in");
          return {
            isSuccessful: true,
            message: "Login successful",
            user: {
              email: user[0].email,
              name: user[0].name,
            },
            token: token,
          };
        } else {
          return {
            isSuccessful: false,
            message: "Invalid password",
          };
        }
      } else {
        return {
          isSuccessful: false,
          message: "User not found",
        };
      }
    } catch (error) {
      errorLogger.constructDetailedError(
        "userController.js",
        "loginUser",
        error
      );
      return {
        isSuccessful: false,
        message: "Server error",
      };
    } finally {
      db.closeConnection();
    }
  }
}

module.exports = UserController;
