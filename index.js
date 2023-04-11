const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const pool = new Pool({
    user: 'ashutosh',
    host: 'air-iq-4486.8nk.cockroachlabs.cloud',
    database: 'defaultdb',
    password: 'Vk9qsvCb0xy6oSImMkeD-A',
    port: 26257,
    ssl: {
        rejectUnauthorized: false,
    },
});

const app = express();
app.use(express.static('public'));

app.use(cors()); // enable CORS

app.use(express.json());

async function saveSensorData(gas1, gas2, gas3, distance1) {
    const query = {
        text: 'INSERT INTO sensordata (gas1, gas2, gas3, distance1) VALUES ($1, $2, $3, $4)',
        values: [gas1, gas2, gas3, distance1],
    };
    await pool.query(query);
}

app.post('/sensordata', async (req, res) => {
    const { gas1, gas2, gas3, distance1 } = req.body;
    await saveSensorData(gas1, gas2, gas3, distance1);
    res.sendStatus(204);
});

app.get('/live', async (req, res) => {
    const query = {
        text: 'SELECT * FROM sensordata ORDER BY id DESC LIMIT 1',
    };
    const result = await pool.query(query);
    if (result.rows.length > 0) {
        const gas1 = result.rows[0].gas1;
        const gas2 = result.rows[0].gas2;
        const gas3 = result.rows[0].gas3;
        const distance1 = result.rows[0].distance1;
        res.json({ gas1, gas2, gas3, distance1 });
    } else {
        res.sendStatus(404);
    }
});

app.get('/old', async (req, res) => {
    const query = {
        text: 'SELECT * FROM sensordata ORDER BY id DESC LIMIT 50',
    };
    const result = await pool.query(query);
    const data = [];
    result.rows.forEach((row, index) => {
        data.push({
            gas1: row.gas1,
            gas2: row.gas2,
            gas3: row.gas3,
            distance1: row.distance1,
        });
    });
    res.json({ data });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
