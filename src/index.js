const cluster = require('cluster');
const server = require('./app');
const numCPUs = require('os').cpus().length;
const PORT = process.env.PORT || 4545;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

} else {
  server.listen(PORT, () => console.log('Server running'));
}