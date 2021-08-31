const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const categories = require("./categories");
const film = require("./film");
const hash = require("./hash");
const geturl = require("./geturl");
//const related = require("./related");
const search = require("./search");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/categories", categories);
app.use("/film", film);
app.use("/geturl", geturl);
app.use("/hash", hash);
//app.use("/related", related);
app.use("/search", search);
app.get("*", (req, res) => {
  res.status(404).send("Такого эндпоинта не существует");
});
app.listen(port, () => console.log(`App is listening on port ${port}!`));
