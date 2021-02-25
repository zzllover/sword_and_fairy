var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用ql方式 根解析器在root上， 即先从root定义的 “路由” 上分发

var schema = buildSchema(`
  type User {
    id: String
    name: String
  }
  type Query {
    user(id: String): User
  }
`);

var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var root = {
  user: ({ id }) => {
    return fakeDatabase[id];
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');