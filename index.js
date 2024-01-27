const express = require("express");
const expressSession = require("express-session");

const app = express();

const PORT = process.env.PORT || 4002;

const SECRET_KEY = process.env.SECRET_KEY || "ota_maxv1y";

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: SECRET_KEY }));

// mock data
let users = [
  {
    id: 1,
    name: "Axmad",
    surname: "Moohseen",
    email: "ahmad@gmail.com",
    password: 312,
    role: "user",
  },
  {
    id: 2,
    name: "Sunnat",
    surname: "Xabibullayev",
    email: "sunnat@gmail.com",
    password: 7777,
    role: "admin",
  },
];

app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login", { message: "" });
});
app.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email == "ahmad@gmail.com" && password == 312) {
    req.session.user = users[0];

    res.redirect("/");
  } else if (email == "sunnat@gmail.com" && password == 7777) {
    req.session.user = users[1];

    res.redirect("/admin");
  } else {
    res.render("login", { message: "login or password is incorrect" });
  }
});

app.get("/admin", (req, res) => {
  if (req.session?.user?.role == "admin") {
    res.render("admin");
  } else {
    res.redirect("/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server responded at ${PORT} port...`);
});
