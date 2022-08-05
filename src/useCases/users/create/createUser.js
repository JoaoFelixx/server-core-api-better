const { JDB } = require('../../../JDB/index');

async function createUser(user) {
  try {
    const Users = new JDB({ model: 'users' });

    const isInvalid = Users.isInvalid(user);

    if (isInvalid)
      return isInvalid;

    await Users.create(user);

  } catch (error) {
    return new Error('Error creating user');
  }
}

module.exports = { createUser };