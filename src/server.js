const path = require("path");

const express = require("express");
const bcrypt = require("bycrpt");
const app = express();
const user = [];
//? Setting the port of the server
const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public"); //? Setting the pubic directory path for the Server
app.set("view engine", "ejs"); // ?Setting the type of view engine for the server
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectoryPath));
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "hey" });
});
app.get("/failed", (req, res) => {
  res.render("failed.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hash(password, 10);
    user.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/failed");
  }
  console.log(users);
});

app.post("/login", (req, res) => {});
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
