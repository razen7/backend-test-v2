const mongoose = require('mongoose');

const ___Schema = mongoose.Schema( // update schemaName
    {
        // update fields


    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

// compiling schema to model
const collectionName = '___';
const ___Model = mongoose.model(collectionName, ___Schema);

module.exports = ___Model;