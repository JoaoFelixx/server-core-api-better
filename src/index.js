const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { server } = require('./app');
const PORT = process.env.PORT || 5050;

if (cluster.isMaster) {
  for (let index = 0; index < numCPUs; index++)
    cluster.fork();

  cluster.on('exit', () => cluster.fork());

} else
  server.listen(PORT, () => console.log('Server running'));