const { Client } = require('pg');
const express = require('express');
const app = express();

const args = process.argv.slice(2);

app.get("/", (req, res) => {
  res.send("Got em!");
});

app.get("/users", (req, res) => {
  client.query('SELECT * FROM users', (err, resp) => {
    if (err) {
      console.log('error:', err);
      client.end();
    }
    res.send(resp.rows);
    console.log('resp.rows:', resp.rows);
    client.end();
  });
});

const client = new Client({
  host: 'localhost',
  user: 'joshyjosh',
  port: 5432,
  password: 'admin',
  database: 'yoga_test'
});

client.connect();

if (args[0]) {

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
}

app.listen(3010, () => {
  console.log("Listening on port 3010");
});