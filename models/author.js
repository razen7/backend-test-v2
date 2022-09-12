const mongoose = require('mongoose');

const authorSchema = mongoose.Schema( // update schemaName
    {
        // update fields
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

// compiling schema to model
const collectionName = 'author';
const authorModel = mongoose.model(collectionName, authorSchema);

module.exports = authorModel;