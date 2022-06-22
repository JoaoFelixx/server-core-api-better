const { JDB } = require('../../../JDB');

async function getUsers() {
  const Users = new JDB('users');

  const users = await Users.get();

  return users;
}

module.exports = { getUsers };