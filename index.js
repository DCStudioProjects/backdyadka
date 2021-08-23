const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const film = require("./film");
const parsing = require("./parsing");
const search = require("./search");
const related = require("./related");
const details = require("./details");
const categories = require("./categories");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.get("/", (req, res) => {
  res.send("Отказано в доступе");
});
app.use("/parsing", parsing);
app.use("/categories", categories);
app.use("/search", search);
app.use("/film", film);
app.use("/details", details);

app.listen(port, () => console.log(`App is listening on port ${port}!`));
