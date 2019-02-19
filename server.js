const express = require('express');
const helmet = require('helmet');


const zoosRouter = require('./zoos/zoos-router.js');
const bearsRouter = require('./bears/bears-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

//routers
server.use('/api/zoos', zoosRouter)


module.exports = server