const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://ashutosh:Vk9qsvCb0xy6oSImMkeD-A@air-iq-4486.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full';

const pool = new Pool({
    connectionString: DATABASE_URL,
});

const insertData = async (level) => {
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO gas_levels (level) VALUES ($1)', [level]);
        console.log(`Inserted gas level ${level} with id ${result.rows[0].id}`);
        client.release();
    } catch (err) {
        console.error('Error inserting data:', err);
    }
};

// Insert some initial values
insertData(50);
insertData(60);
insertData(70);
