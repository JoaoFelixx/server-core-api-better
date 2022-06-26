const { JDB } = require('../../../JDB');

async function getUsers() {
  const Users = new JDB({ model: 'users' });

  console.log(Users);

  const users = await Users.get();

  return users;
}

module.exports = { getUsers };