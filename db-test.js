const { Client } = require('pg');

const args = process.argv.slice(2);

const client = new Client({
  host: 'localhost',
  user: 'joshyjosh',
  port: 5432,
  password: 'admin',
  database: 'yoga_test'
});

client.connect();

switch(args[0]) {
  case 'users':
    client.query('SELECT * FROM users', (err, res) => {
      if (err) {
        console.log('error:', err);
        client.end();
      }
      console.log('res.rows:', res.rows);
      client.end();
    });
    break;
  default:
    return client.query('INSERT INTO users(name, age) VALUES ($1, $2);', [args[0], args[1]])
      .then((result) => {
        console.log('Successfully inserted');
        client.end();
      })
      .catch((err) => {
        console.log('Caught err:', err);
        client.end();
      });
}



