const express = require('express');
const app = express();
const port = 5000;
const film = require('./film');
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());

app.use(cors({
    origin: function (origin, callback) {
        var whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://new.dyadka.gq', 'https://dyadka.gq', 'https://tv.dyadka.gq'];

        if (whitelist.indexOf(origin) === -1) {
            var message = "The CORS policy for this origin doesn't allow access from the particular origin.";
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.get('/', (req, res) => {
    res.send('Отказано в доступе')
})
app.use('/film', film);

app.listen(port, () => console.log(`App is listening on port ${port}!`))