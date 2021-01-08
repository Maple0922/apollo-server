/* src/index.js */

// ApolloServerをrequire
const { ApolloServer } = require("apollo-server");

// schemaをrequire
const typeDefs = require('./schema');

// resolverをrequire
const resolvers = require('./resolver')

// Userモデルをrequire
const User = require('./db/models/User');

// データベースとの接続インスタンスをrequire
const { getDB } = require('./db')

const boot = async () => {

  // データベースのインスタンスを取得
  const store = await getDB();

  // ApolloServerを初期化
  const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true,
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
      User: new User({ store })
    }),
  });

  // 指定ポートでの待ち受けを開始
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

boot();
