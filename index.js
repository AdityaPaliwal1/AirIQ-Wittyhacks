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

async function saveGasLevel(level) {
  const query = {
    text: 'INSERT INTO gas_levels (level) VALUES ($1)',
    values: [level],
  };
  await pool.query(query);
}

app.post('/gas-levels', async (req, res) => {
  const { level } = req.body;
  await saveGasLevel(level);
  res.sendStatus(204);
});

app.get('/live', async (req, res) => {
  const query = {
    text: 'SELECT * FROM gas_levels ORDER BY id DESC LIMIT 1',
  };
  const result = await pool.query(query);
  if (result.rows.length > 0) {
    const level = result.rows[0].level;
    res.json({ level });
  } else {
    res.sendStatus(404);
  }
});

app.get('/old', async (req, res) => {
  const query = {
    text: 'SELECT * FROM gas_levels ORDER BY id DESC LIMIT 50',
  };
  const result = await pool.query(query);
  const levels = {};
  result.rows.forEach((row, index) => {
    levels[index] = row.level;
  });
  res.json({ levels });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
