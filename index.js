const express = require('express');
const app = express();
const port = 5000;
const film = require('./film');
const search = require('./search');
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Отказано в доступе')
})
app.use('/film', film);
app.use('/search', search);

app.listen(port, () => console.log(`App is listening on port ${port}!`))