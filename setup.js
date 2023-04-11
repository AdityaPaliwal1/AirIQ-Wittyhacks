const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://ashutosh:Vk9qsvCb0xy6oSImMkeD-A@air-iq-4486.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full';

const pool = new Pool({
    connectionString: DATABASE_URL,
});

pool.query(`
  CREATE DATABASE IF NOT EXISTS airiq;
`).then(() => {
    console.log('airiq database created successfully');

    const client = new Pool({
        connectionString: `${DATABASE_URL}&dbname=airiq`,
    });

    client.query(`
    CREATE TABLE IF NOT EXISTS sensordata (
      id SERIAL PRIMARY KEY,
      gas1 INTEGER,
      gas2 INTEGER,
      gas3 INTEGER,
      distance1 INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `).then(() => {
        console.log('sensordata table created successfully');
    }).catch(err => {
        console.error('Error creating sensordata table:', err);
    });
}).catch(err => {
    console.error('Error creating airiq database:', err);
});
