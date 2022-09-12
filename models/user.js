const mongoose = require('mongoose');

const userSchema = mongoose.Schema( // update schemaName
    {
        // update fields
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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
const collectionName = 'user';
const userModel = mongoose.model(collectionName, userSchema);

module.exports = userModel;