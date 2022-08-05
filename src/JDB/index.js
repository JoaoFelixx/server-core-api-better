const { join } = require('path');
const { readFile, writeFile } = require('fs/promises');

const modelsPath = {
  users: join(__dirname, '..', '..', 'database', 'Users.json'),
  leagues: join(__dirname, '..', '..', 'database', 'Leagues.json')
}

const User = {
  username: {
    type: 'string',
  },
  preferenceColorTheme: {
    type: 'string',
    default: ['white', 'dark'],
  }
}

const modelSettings = {
  model: ''
}

const models = {
  'users': User,
  'leagues': null,
}

class JDB {
  constructor({ model } = modelSettings) {
    this.model = model;
    this.selectedModel = models[model]
  }

  isInvalid(user) {
    if (!this.selectedModel)
      return false;

    const keys = Object.keys(this.selectedModel);

    const invalidKeys = keys.filter((key) => {
      if (typeof user[key] !== this.selectedModel[key].type)
        return true;

      if (!this.selectedModel[key].default)
        return false;

      const isADefaultValue = this.selectedModel[key].default
        .find((item) => item === user[key]);

      return isADefaultValue ? false : true;
    })

    const result = invalidKeys.length > 0 ? invalidKeys : false;

    return result;
  }

  async get() {
    const json = await readFile(modelsPath[this.model], 'utf8');

    const data = JSON.parse(json);

    return data;
  }

  async create(item) {
    const data = await this.get();

    data.push(item);

    await writeFile(modelsPath[this.model], JSON.stringify(data), 'utf8');
  }

  async delete(id) {
    const data = await this.get();

    const savedItems = data.filter(({ _id }) => _id !== id);

    await writeFile(modelsPath[this.model], JSON.stringify(savedItems), 'utf8');
  }
}

module.exports = { JDB };