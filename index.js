const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const activate = require("./routes/activate");
const categories = require("./routes/categories");
const checkuser = require("./routes/checkuser");
const favorites = require("./routes/favorites");
const film = require("./routes/film");
const geturl = require("./routes/geturl");
const login = require("./routes/login");
const logout = require("./routes/logout");
const refresh = require("./routes/refresh");
const register = require("./routes/register");
const search = require("./routes/search");
const timestamp = require("./routes/timestamp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const { domain, headers } = require("./config/globalStorage");

require("dotenv").config();

fetch(domain, {
  method: "GET",
  headers: headers.index,
});

fetch(`${domain}/page/2/`, {
  method: "GET",
  headers: headers.prefetch,
});

app.use(express.json());
app.use(cookieParser());

app.use(cors());

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB")
);

app.use(
  activate,
  categories,
  checkuser,
  favorites,
  film,
  geturl,
  login,
  logout,
  refresh,
  register,
  search,
  timestamp
);

app.get("*", (req, res) => {
  res.status(404).send("Такого эндпоинта не существует");
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
