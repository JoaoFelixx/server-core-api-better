const { join } = require('path');
const {
  promises: { readFile, writeFile },
} = require('fs');

const models = {
  users: join(__dirname, '..', '..', 'database', 'users.json'),
  employees: join(__dirname, '..', '..', 'database', 'employees.json')
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

const Employee = {
  _id: {
    isPrimary: true,
  },
  name: {
    type: '',
    isUnique: true,
  },
  dayOff: {
    type: '',
    isUnique: false
  },
  items: ['_id', 'name', 'dayOff']
}

const modelsSettings = {
  model: ''
}

class JDB {
  constructor(model = modelsSettings) {
    Object.assign(this, model)
    this.selectedModel = model.model ? User : Employee;
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