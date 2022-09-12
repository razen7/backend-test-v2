const mongoose = require('mongoose');

const issueSchema = mongoose.Schema( // update schemaName
    {
        // update fields
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            required: true,
        },
        is_being_issued: {
            type: Boolean,
            default: true,
            required: true,
        },
        due_date: {
            type: Date,
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
const collectionName = 'issue';
const issueModel = mongoose.model(collectionName, issueSchema);

module.exports = issueModel;