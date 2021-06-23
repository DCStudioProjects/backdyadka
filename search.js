const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

router.get('/', async function (req, api) {
    const search = (await axios.get(`http://103.119.112.27/partner_api/suggests?query=${encodeURIComponent(req.query.q)}`,
        {
            headers: {
                "X-FX-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6ImZ4LTYwZDIyNGUwYzI0MTgifQ.eyJpc3MiOiJodHRwczpcL1wvZmlsbWl4Lm1lIiwiYXVkIjoiaHR0cHM6XC9cL2ZpbG1peC5tZSIsImp0aSI6ImZ4LTYwZDIyNGUwYzI0MTgiLCJpYXQiOjE2MjQzODQ3MzYsIm5iZiI6MTYyNDM3MzkzNiwiZXhwIjoxNjI2OTc2NzM2LCJwYXJ0bmVyX2lkIjoiMiIsImhhc2giOiI2MzM0ZDE4YzJkNmY5YTZiZTkyNTMwZDE5ZTIwOTI5NTA3ZjQ4OWIwIiwidXNlcl9pZCI6bnVsbCwiaXNfcHJvIjpmYWxzZSwiaXNfcHJvX3BsdXMiOmZhbHNlLCJzZXJ2ZXIiOiIifQ.xokKOK9NVe9Y8aqlxLpzDS23HRQFwLru3MAyz2eF1Ug"
            }
        })).data

    api.send({ search: search.items })
});

module.exports = router;
