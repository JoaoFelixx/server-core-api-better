const cluster = require('cluster');
const server = require('./app');
const numCPUs = require('os').cpus().length;
const PORT = process.env.PORT || 5050;

if (cluster.isMaster)
  for (let index = 0; index < numCPUs; index++)
    cluster.fork();
else
  server.listen(PORT, () => console.log('Server running'));