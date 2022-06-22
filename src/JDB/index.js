const { join } = require('path');
const {
  promises: { readFile, writeFile },
} = require('fs');

const models = {
  users: join(__dirname, '..', '..', 'database', 'users.json'),
  employees: join(__dirname, '..', '..', 'database', 'employees.json')
}

class JDB {
  constructor(model) {
    this.model = model;
  }

  async get() {
    const json = await readFile(models[this.model], 'utf8');

    const data = JSON.parse(json);

    return data;
  }

  async set(item) {
    const data = await this.get();

    data.push(item);

    await writeFile(models[this.model], JSON.stringify(data), 'utf8');
  }

  async delete(id) {
    const data = await this.get();

    const savedItems = data.filter(({_id}) => _id !== id);

    await writeFile(models[this.model], JSON.stringify(savedItems), 'utf8');
  }
}

module.exports = { JDB };