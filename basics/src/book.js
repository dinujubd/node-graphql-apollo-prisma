export default {
    author: (parent, args, { db }, info) => {
        if (parent.author) {
            return db.authors.find(a => a.id === parent.author)
        }

        return [];
    }
}