const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routerApi = require("./routers/api");
const cors = require("cors");
const path = require("path");

dotenv.config();

// קונפיגורציה של CORS
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

//מניעת שגיאת קורס
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authoriztion"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    console.log("hi cors");

    return res.status(200).json({});
  }
  next();
});

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_CONNECT, connectionParams)
  .then(() => {
    console.log("connected!!");
  })
  .catch((err) => {
    console.log(`error connecting${err}`);
  });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  console.log("hello world!");

  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ייבוא ה-API
app.use("/", routerApi);

app.use((error, req, res, next) => {
  console.error("Error stack:", error.stack);
  console.error("Request URL:", req.url);
  console.error("Request method:", req.method);
  console.error("Request body:", req.body);
  res.status(500).json({ error: error.message });
});

const server = app.listen(process.env.PORT, () => {
  console.log("connect!!!");
});
