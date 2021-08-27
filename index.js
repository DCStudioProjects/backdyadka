const express = require("express");
const app = express();
const port = process.env.PORT || 1000;
const categories = require("./categories");
//const details = require("./details"); NEEDS WORK!
const film = require("./film");
const hash = require("./hash");
const geturl = require("./geturl");
//const related = require("./related");
const search = require("./search");
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use("/categories", categories);
//app.use("/details", details);
app.use("/film", film);
app.use("/geturl", geturl);
app.use("/hash", hash);
//app.use("/related", related);
app.use("/search", search);
app.get("*", (req, res) => {
  res.status(404).send("Такого эндпоинта не существует");
});
app.listen(port, () => console.log(`App is listening on port ${port}!`));
