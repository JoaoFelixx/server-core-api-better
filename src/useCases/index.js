const { getLeagueController } = require('./leagues');
const { 
  getUsersController, 
  deleteUserController, 
  createUserController, 
} = require('./users');

module.exports = { 
  getUsersController, 
  getLeagueController,
  deleteUserController, 
  createUserController, 
};