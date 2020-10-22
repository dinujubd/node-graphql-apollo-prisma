export default {
    createBook: (parent, { name, author }, { db }, info) => {

        if (!db.authors.find(a => a.id == Number(author))) {
            throw Error("Author Invalid")
        }
        const id = db.bookData[db.bookData.length - 1].id + 1
        const book = { id: id, name: name, author: Number(author) }
        db.bookData.push(book);

        return book;
    }
}