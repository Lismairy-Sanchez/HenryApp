const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const passport = require("passport");

const app = express();
require("./config/passport");
require("./config/passportGoogle");
require("./config/passportGitHub");
//settings

const store = new session.MemoryStore();

app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:3000",
  })
);
app.set("port", process.env.PORT || 3001);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    store: store,
    saveUninitialized: true,
    cookie: { maxAge: 240 * 60 * 60 * 100 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

module.exports = app;
