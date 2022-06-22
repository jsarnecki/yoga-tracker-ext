const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'joshyjosh',
  port: 5432,
  password: 'admin',
  database: 'yoga_test'
});

client.connect();

client.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.log('error:', err);
    client.end();
  }

  console.log('res.rows:', res.rows);
  client.end();
})