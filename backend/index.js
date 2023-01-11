//      ***********   Entry file for backend application   ************

// dotenv is a package that loads environment variables from a dotenv file into the process.env Object available to us globally in a nodejs environment

// config method will attach the environment variables to the process.env Object
require("dotenv").config();

const express = require("express");
const cors = require("cors"); // for production
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// creates express app
const app = express();

// middleware - any code that executes between us getting a request on the server and us sending a response

// to access data from request object we need to add a middleware - it looks for body in request - if it does, then it passess it and attaches it to the request object so that we can access it in the request handler
app.use(cors()); // for production
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// route handler which reacts to requests
// to only fire these routes when we come to a specific path, we should pass the first argument
app.use("/api/workouts", workoutRoutes); // see the comment on workouts.js
// app.get("/", (req, res) => {
//   res.json({ mssg: "Welcome to the app" });
// });

// connect to db - it is asynchronous in nature i.e. it will take some time and return a promise
// it will make a db named "tnn-mern"
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "tnn-mern", // by this name a db will be created in Atlas
  })
  .then(() => {
    // listen for requests only once we are connected to db
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and listening at PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// listen for requests
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running at PORT ${process.env.PORT}`);
// });
