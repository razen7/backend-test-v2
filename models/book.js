const mongoose = require('mongoose');

const bookSchema = mongoose.Schema( // update schemaName
    {
        // update fields
        title: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author',
            required: true,
        },
        is_being_issued: {
            type: Boolean,
            default: false
        }
    }, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
}
)

// compiling schema to model
const collectionName = 'book';
const bookModel = mongoose.model(collectionName, bookSchema);

module.exports = bookModel;