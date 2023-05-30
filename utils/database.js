import mongoose from "mongoose";

let isConnected = false; // track the connection

//The mongoose.set() function is used to set various configuration options in Mongoose

export const connectToDB = async () => {
  //To enforce strict mode for queries
  mongoose.set("strictQuery", true);
  //This means that if you try to perform a query using undefined fields or fields that are not defined in your Mongoose schema, Mongoose will throw an error.

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Promptopia",

      useNewUrlParser: true, // ensure compatibility with the latest version of MongoDB.

      useUnifiedTopology: true, // to utilize the latest technology.
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    isConnected = false;
    console.log(error);
  }
};
