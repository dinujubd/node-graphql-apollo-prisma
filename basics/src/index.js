import { GraphQLServer } from 'graphql-yoga'

const bookData = [
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

    type Mutation {
        createBook(name:String!, author: ID!): Book!
    }

    type Book {
        id: ID!
        name: String!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        books: [Book!]
    }
`

const resolvers = {
    Query: {
        hello: _ => "Hello world",
        title: _ => null,
        balance: _ => 500,
        owe: _ => 50.5,
        books: _ => {
            return bookData;
        },
        greet: (_, { name }) => `Hello ${name}`,
        search: (_, args) => {
            if (!args.query) return bookData;

            return bookData.filter(b => b.name.toLowerCase().includes(args.query.toLowerCase()))
        }
    },
    Mutation: {
        createBook: (parent, { name, author }, ctx, info) => {

            if (!authors.find(a => a.id == Number(author))) {
                throw Error("Author Invalid")
            }
            const id = bookData[bookData.length - 1].id + 1
            const book = { id: id, name: name, author: Number(author) }

            bookData.push(bookData);
            return book;
        }
    },
    Book: {
        author: (parent, args, ctx, info) => {
            if (parent.author) {
                return authors.find(a => a.id === parent.author)
            }

            return [];
        }
    },
    Author: {
        books: (parent, args, ctx, info) => {

            console.log(parent);

            if (parent.id) {
                return bookData.filter(b => b.author === parent.id)
            }
            return [];
        }
    }


}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'))