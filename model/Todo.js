const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    lastEdit: {
        type: Date,
        default: null
    },
    label: {
        personal: {
            type: Boolean,
            default: false
        },
        work: {
            type: Boolean,
            default: false
        },
        shopping: {
            type: Boolean,
            default: false
        },
        others: {
            type: Boolean,
            default: false
        }
    },
    status: {
        newItem: {
            type: Boolean
        },
        inProgress: {
            type: Boolean
        },
        completed: {
            type: Boolean
        }
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);