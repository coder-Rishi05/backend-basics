// import ap

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});


const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (err) => {
      console.log("Error", err);
      throw err;
    });
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server running at port : ", process.env.PORT);
    });
  } catch (err) {
    console.log("MongoDb connection error", err);
    throw err;
  }
};

startServer();
