const { getUsersController } = require('./get');
const { createUserController } = require('./create');
const { deleteUserController } = require('./delete');

module.exports = { getUsersController, createUserController, deleteUserController };