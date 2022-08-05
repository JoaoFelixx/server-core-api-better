const { JDB } = require('../../../JDB/index');

async function getUsers(id) {
  try {
    const Users = new JDB({ model: 'users' });

    const users = await Users.get();

    if (!id)
      return users;

    const user = users.find(({ _id }) => _id === id);

    return user;
  } catch (error) {
    return new Error('Error getting users');
  }
}

module.exports = { getUsers };