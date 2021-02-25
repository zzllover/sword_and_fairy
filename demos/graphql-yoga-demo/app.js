const { GraphQLServer } = require('graphql-yoga');
// const cors = require('cors')

const typeDefs = `
  type Product {
      id: Int!
      name: String
      price: Float
      count: Int
  }

  type Store{
    id: String!
    name: String!
    addr: String
    year: Float
    staff: [Staff!]
  }

  type Staff{
    id: String!
    store_id: String!
    store_name: String
    name: String
    tel: String
  }

  type Query {
    hello: String!
    product(id: Int!): Product
    store(id: String!): Store
  }

  input InputProduct{
    name: String!
    price: Float!
  }

  type Mutation{
    createProduct(input: InputProduct): Product
  }

`;

const resolvers = {
  Query: {
    hello() {
      return 'hello world';
    },
    product(parent, args, ctx, info) {
      return {
        id: args.id,
        name: 'GG',
        price: 1.2,
        count: 12
      }
    },
    store(parent, args, ctx, info) {
      return {
        id: args.id,
        name: 'Ming Store',
        addr: 'dashi',
        year: 1.5,
      }
    }
  },
  Store: {
    staff(parent, args, ctx, info) {
      return [
        {
          id: '1',
          store_id: parent.id,
          store_name: parent.name,
          name: 'Ming Staff',
          tel: '1567164'
        },
        {
          id: '2',
          store_id: parent.id,
          store_name: parent.name,
          name: 'Ming Staff 1',
          tel: '1567164'
        },
        {
          id: '3',
          store_id: parent.id,
          store_name: parent.name,
          name: 'Ming Staff 2',
          tel: '1567164'
        }
      ]
    }
  },
  Mutation: {
    createProduct(parent, args, ctx, info) {
      const { input } = args;
      console.log(input);
      return {
        id: 66,
        name: input.name,
        price: input.price,
        count: 0
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

// server.use(cors);

server.start(() => {
  console.log("start....")
})