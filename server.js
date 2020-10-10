// Express Dependencies
const express = require('express');
const expressHandle = require('express-handlebars');

var PORT = process.env.PORT || 3000;

let server = express();

// Send the static content to the server
server.use(express.static('public'));

server.use(express.urlencoded({ extended: true}));
server.use(express.json());

// Set the server to use handlebars
server.engine('handlebars', expressHandle({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');

// Grab the routes from the controllers folder and let the server use them
const routes = require('./controllers/burger_controller');

server.use(routes);

// Start the server
server.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`);
});
