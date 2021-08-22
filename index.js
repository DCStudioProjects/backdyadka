const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const film = require("./film");
const parsing = require("./parsing");
const search = require("./search");
const episodes = require("./episodes");
const related = require("./related");
const details = require("./details");
const token = require("./token");
const categories = require("./categories");
const cors = require("cors");
const serverless = require("serverless-http");

app.use(cors());
app.get("/", (req, res) => {
  res.send("Отказано в доступе");
});
app.use(`/.netlify/functions/api`, "/parsing", parsing);
app.use(`/.netlify/functions/api`, "/categories", categories);
app.use(`/.netlify/functions/api`, "/search", search);
app.use(`/.netlify/functions/api`, "/episodes", episodes);
app.use(`/.netlify/functions/api`, "/film", film);
app.use(`/.netlify/functions/api`, "/details", details);
app.use(`/.netlify/functions/api`, "/token", token);

app.listen(port, () => console.log(`App is listening on port ${port}!`));

module.exports = app;
module.exports.handler = serverless(app);
