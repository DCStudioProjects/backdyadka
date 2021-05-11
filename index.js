const express = require('express');
const app = express();
const port = 5000;
const film = require('./film');
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());

var corsOptions = {
    origin: function (origin, callback) {
        // Loading a list of allowed origins from the database
        origins = ['http://localhost:3000', 'https://new.dyadka.gq', 'https://dyadka.gq', 'https://tv.dyadka.gq']
        database.loadOrigins((error, origins) => {
            callback(error, origins);
        });
    }
}

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Отказано в доступе')
})
app.use('/film', film);

app.listen(port, () => console.log(`App is listening on port ${port}!`))