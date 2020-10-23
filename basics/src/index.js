import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/query'
import Mutation from './resolvers/mutation'
import Book from './resolvers/book'
import Author from './resolvers/author'
import Subscription from './resolvers/subscription'
import db from './db'

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs: "./src/schema.graphql", resolvers: { Query, Mutation, Subscription, Book, Author }, context: { db, pubsub } });

server.start(() => console.log('Server is running on localhost:4000'))