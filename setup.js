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
    connectionString: DATABASE_URL,
    database: 'airiq',
  });

  client.query(`
    CREATE TABLE IF NOT EXISTS gas_levels (
      id SERIAL PRIMARY KEY,
      level INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `).then(() => {
    console.log('gas_levels table created successfully');
  }).catch(err => {
    console.error('Error creating gas_levels table:', err);
  });
}).catch(err => {
  console.error('Error creating airiq database:', err);
});