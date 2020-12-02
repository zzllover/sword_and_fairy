const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
  // host: 'localhost',
  // port: '3306',
  // user: '#',
  // password: '*',
  // database: 'graphql'
})

const query = util.promisify(conn.query).bind(conn);

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
  }
})

const Query = new GraphQLObjectType({ // 定义查询所用的
  name: 'Query',
  fields: {
    student: {
      type: StudentType, // 返回值类型
      args: { // 查询参数类型
        id: {type: GraphQLInt}
      },
      async resolve(_, { id }) {
        // return { id: id, name: 'mingge', sex: 'male', age: 22 }
        let res = await query(`select * from student where id=${id}`);
        return res[0];
      }
    }
  }
})

const Mutation = new GraphQLObjectType({ // 定义查询所用的
  name: 'mutation',
  fields: {
    insertStudent: {
      type: StudentType, // 返回值类型
      args: { // 定义所接受的参数类型
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        sex: { type: GraphQLString }
      },
      async resolve(_, { name, age, sex }) {
        let res = await query(`insert into student(name,age,sex) value('${name}','${age}','${sex}')`);
        return { id: res.insertId, name, age, sex };
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

const app = express();

app.use('/student', graphqlHTTP({
  graphiql: true,
  schema: schema
}));

app.listen(4000);