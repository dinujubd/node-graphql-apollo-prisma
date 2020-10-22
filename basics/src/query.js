export default {
    hello: _ => "Hello world",
    title: _ => null,
    balance: _ => 500,
    owe: _ => 50.5,
    books: (a, b, { db }) => {
        return db.bookData;
    },
    greet: (_, { name }) => `Hello ${name}`,
    search: (_, args, { db }) => {
        if (!args.query) return db.bookData;

        return db.bookData.filter(b => b.name.toLowerCase().includes(args.query.toLowerCase()))
    }
}