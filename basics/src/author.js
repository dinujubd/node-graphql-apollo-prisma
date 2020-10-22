export default {
    books: (parent, args, { db }, info) => {
        if (parent.id) {
            return db.bookData.filter(b => b.author === parent.id)
        }
        return [];
    }
}