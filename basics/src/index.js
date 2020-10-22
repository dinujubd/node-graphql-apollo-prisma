import { GraphQLServer } from 'graphql-yoga'

const books = [
    { id: 1, name: "art of war", author: 1 },
    { id: 2, name: "the alchemist", author: 2 }
]

const authors = [
    { id: 1, name: "Sun Tzu" },
    { id: 2, name: "Paolo Coelho" }
]

const typeDefs = `
    type Query {
        hello:String!
        title:String
        balance: Int!
        owe: Float
        books: [Book!]
        greet(name: String!): String!
        search(query:String): [Book!]!
    }

    type Book {
        id: ID!
        name: String!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
    }
`

const resolvers = {
    Query: {
        hello: _ => "Hello world",
        title: _ => null,
        balance: _ => 500,
        owe: _ => 50.5,
        books: _ => {
            return books;
        },
        greet: (_, { name }) => `Hello ${name}`,
        search: (_, args) => {
            if (!args.query) return books;

            return books.filter(b => b.name.toLowerCase().includes(args.query.toLowerCase()))
        }
    },
    Book: {
        author: (parent, args, ctx, info) => {
            if (parent.author) {
                return authors.find(a => a.id === parent.author)
            }

            return [];
        }
    }

}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'))