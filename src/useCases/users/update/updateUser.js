const { JDB } = require('../../../JDB/index');

async function updateUser(user) {
  try {
    const Users = new JDB({ model: 'users' });

    const isInvalid = Users.isInvalid(user);

    if (isInvalid)
      return isInvalid;

    const result = await Users.update(user);

    if (result instanceof Error)
      return new Error(result.message);

  } catch (error) {
    return new Error('Error updating user');
  }
}

module.exports = { updateUser };