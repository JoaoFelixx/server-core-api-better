const { JDB } = require('../../../JDB/index');

async function deleteUser(id) {
  try {
    const Users = new JDB({ model: 'users' });

    await Users.delete(id);
  } catch (error) {
    return new Error('Error deleting user');
  }
}

module.exports = { deleteUser };