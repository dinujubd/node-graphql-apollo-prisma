const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { createContext } = require('./context')

new ApolloServer({ schema, context: createContext }).listen(
    { port: 4000 }
)