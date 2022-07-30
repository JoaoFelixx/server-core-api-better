const { JDB } = require('../../../JDB');

async function getUsers(id) {
  const Users = new JDB({ model: 'users' });

  const users = await Users.get();

  if (!id) 
    return users;

  const user = users.find(({ _id }) => _id  === id);

  return user;
}

module.exports = { getUsers };