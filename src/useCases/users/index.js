const { getUsersController } = require('./get');
const { createUserController } = require('./create');
const { deleteUserController } = require('./delete');
const { updateUserController } = require('./update');

module.exports = {
  getUsersController,
  updateUserController,
  createUserController,
  deleteUserController,
};