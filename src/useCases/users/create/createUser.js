const { JDB } = require('../../../JDB');

async function createUser(user) {
  try {
    const Users = new JDB('users');
    
    await Users.set(user);

  } catch (error) {
    console.log(error)
    return new Error('Error creating user');
  }
}

module.exports = { createUser };