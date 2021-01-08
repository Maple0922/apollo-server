/* src/resolver.js */
const resolvers = {
  Query: {
    // hello というQueryが来た場合には"World!"と返す。
    hello: (root, args, context) => "World!",
    // users というQueryが来た場合にはユーザーを全取得して返す。
    users: async (root, args, { dataSources }) => {
      return await dataSources.User.findAll();
    }
  },

  Mutation: {
    // createUser というMutationが来た場合には、ユーザーを探して返す。(なければ作成)
    createUser: async (root, { name }, { dataSources }) => {
      const user = await dataSources.User.findOrCreate({where: { name }});
      return user[0].dataValues
    },
  },
};

module.exports = resolvers;
