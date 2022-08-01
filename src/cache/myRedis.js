const myRedis = {};
const oneDay = 100 * 60 * 60;

function addDayToDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
}

const find = (_id = '') => myRedis[_id]?.data || null;

const create = (_id = '', data) => myRedis[_id] = {
  data: data,
  expiresIn: addDayToDate()
}

setInterval(() => { // Cleans cache
  const keys = Object.keys(myRedis)
  const currentDate = new Date().getTime();

  const isExpired = (key) => currentDate > myRedis[key].expiresIn.getTime();
  const keysForDelete = keys.filter(isExpired);

  if (!keysForDelete)
    return

  keysForDelete.map((key) => delete myRedis[key]);
}, oneDay);

module.exports = { find, create };