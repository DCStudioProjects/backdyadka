const express = require('express');
const app = express();
const port = 5000;
const film = require('./film');
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());


var allowlist = ['http://localhost:3000', 'http://localhost:5000', 'https://new.dyadka.gq', 'https://dyadka.gq', 'https://tv.dyadka.gq'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
app.get('/', cors(corsOptionsDelegate), (req, res) => {
    res.send('Отказано в доступе')
})
app.use('/film', film);

app.listen(port, () => console.log(`App is listening on port ${port}!`))