const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
const routes = require("./api/routes/index");
const connectDB = require("./db_connection"); // Database connection
const { connect } = require("mongoose");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// connect to the database 
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Dynamically set based on environment
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // Cookie settings
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL || "mongodb://localhost:27017/your-db", // Use MongoDB for session storage
      collectionName: "sessions",
    }),
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET || "cookie-secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to ReadWise Library Backend!");
});
app.use(routes);

// Handle undefined routes (404 fallback)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware (optional for debugging)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
//   console.log("Server is connected to port " + PORT);
    console.log(`Server is running on port ${PORT}`);
});





// const express = require("express")
// const cors = require("cors");
// const passport = require("passport");
// const cookieParser = require("cookie-parser");
// // const bcrypt = require("bcryptjs");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const app = express();
// const dotenv = require("dotenv")
// const routes = require("./api/routes/index")
// const router = require("express").Router();
// dotenv.config();

// const PORT = process.env.PORT || 4000;
// app.use(morgan("dev"));

// //database connection
// require("./db_connection");


// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//     cors({
//         origin: "http://localhost:3000", // <-- location of the react app were connecting to
//         credentials: true,
//     })
// );
// app.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//         cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, prioroty: "High" }
//     })
// );
// app.use(cookieParser(process.env.SECRET));
// app.use(passport.initialize());
// app.use(passport.session());
// require("./config/passportConfig")(passport);


// //Middleware End

// //Route

// app.use(routes);


// app.get("/", (req, res) => {
//   res.send("Welcome to ReadWise Library Backend!");
// });
// app.use(routes);

// // Handle undefined routes (404 fallback)
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.listen(PORT, () => {
//     console.log("Server Is Connected to Port " + PORT);
// })
