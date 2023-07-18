const express = require('express');
const morgan = require('morgan');

const server = express();

server.name = 'API';

//setear headers
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  
//setear rutas
server.use('/', (req, res) => {
    res.send('hola')})

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 400;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

//middleware


module.exports = server;