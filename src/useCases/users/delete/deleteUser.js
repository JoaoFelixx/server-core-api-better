const { JDB } = require('../../../JDB');

async function deleteUser(id) {
  try {
    const Users = new JDB('users');

    await Users.delete(id);
  } catch (error) {
    return new Error('Error deleting user');
  }
}

module.exports = { deleteUser };