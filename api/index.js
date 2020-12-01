const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

const { DATABASE_ATLAS } = process.env;
// const database_localhost = "mongodb://localhost/HenryApp"; //if not found-> replace 127.0.0.1:27017

mongoose
  .connect(DATABASE_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });
  });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB connected");
});

//--------------------------------SuperUser
const bcrypt = require("bcryptjs");

User.findOneAndUpdate(
  { name: "admin" }, // find a document with that filter
  {
    name: "admin",
    email: "admin@henry.com",
    role: "admin",
    dni: 000000,
    password: bcrypt.hashSync("admin", 10),
  }, // document to insert when nothing was found
  { upsert: true, new: true, runValidators: true }, // options
  function (err, admin) {
    // callback
    if (err) {
      console.log(err);
    } else {
      console.log(
        "\n----Super-user---- \n #name: ",
        admin.name,
        "\n #email: ",
        admin.email,
        "\n #password: ",
        admin.password,
        "\n #dni: ",
        admin.dni,
        "\n -----------------\n"
      );
    }
  }
);
