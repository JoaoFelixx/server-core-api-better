const { getLeagueController } = require('./leagues');
const { 
  getUsersController, 
  deleteUserController, 
  createUserController,
  updateUserController,
} = require('./users');

module.exports = { 
  getUsersController, 
  getLeagueController,
  deleteUserController, 
  createUserController,
  updateUserController, 
};