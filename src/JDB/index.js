const { join } = require('path');
const { readFile, writeFile } = require('fs/promises');

const models = {
  users: join(__dirname, '..', '..', 'database', 'users.json'),
}

const User = {
  _id: {
    isPrimary: true
  },
  username: {
    type: '',
    isUnique: true,
  },
  items: ['_id', 'username']
}

const modelsSettings = {
  model: ''
}

class JDB {
  constructor(model = modelsSettings) {
    Object.assign(this, model)
    this.selectedModel = model.model && User;
  }

  async get() {
    const json = await readFile(models[this.model], 'utf8');

    const data = JSON.parse(json);

    return data;
  }

  async create(item) {
    const data = await this.get();

    data.push(item);

    await writeFile(models[this.model], JSON.stringify(data), 'utf8');
  }

  async delete(id) {
    const data = await this.get();

    const savedItems = data.filter(({ _id }) => _id !== id);

    await writeFile(models[this.model], JSON.stringify(savedItems), 'utf8');
  }
}

module.exports = { JDB };