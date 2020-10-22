import { GraphQLServer } from 'graphql-yoga'
import Query from './query'
import Mutation from './mutation'
import Book from './book'
import Author from './author'
import db from './db'

const server = new GraphQLServer({ typeDefs: "./src/schema.graphql", resolvers: { Query, Mutation, Book, Author }, context: { db } });

server.start(() => console.log('Server is running on localhost:4000'))