const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// console.log that your server is up and running

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.static("public")); //added from project-test
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require("./controllers/appController"); 
app.use(routes);
// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.get('/getmembers', (req, res) => { //added from project-test
  connection.connect();
  connection.query('SELECT * FROM membersTable', function(error, results) {
      if (!err) {
          res.send(results);
      } else {
          console.log('Error while performing Query.');
      }
  });
  connection.end();
});


app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`));

