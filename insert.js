const axios = require('axios');

axios.post('https://airiq.ashutosh7i.repl.co/sensordata', {
    gas1: 200,
    gas2: 300,
    gas3: 400,
    distance1: 500,
})
    .then(response => {
        console.log('Data inserted successfully');
    })
    .catch(error => {
        console.error('Error inserting data:', error);
    });
