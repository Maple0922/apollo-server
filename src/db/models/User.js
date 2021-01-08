/* src/db/models/User.js */
const { DataSource } = require('apollo-datasource');

class User extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  // ユーザーを全検索
  async findAll() {
    return this.store.users.findAll()
  }

  // ユーザーを検索。なければ、指定されたwhereの条件で作成する。
  async findOrCreate( { where, defaults = {}} ) {
    return await this.store.users.findOrCreate({where, defaults})
  }
}

module.exports = User;
