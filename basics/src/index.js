import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
    type Query {
        hello:String!
        title:String
        balance: Int!
        owe: Float
        books: [Book!]
    }

    type Book {
        name: String!
    }
`

const resolvers = {
    Query: {
        hello: _ => "Hello world",
        title: _ => null,
        balance: _ => 500,
        owe: _ => 50.5,
        books: _ => [{ name: "art of war" }]
    }

}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'))