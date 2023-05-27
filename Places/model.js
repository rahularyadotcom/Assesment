const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['published', 'not published'],
        default: 'not published'
    },
    coverImage: {
        type: String,
        required: true
    },
    placeType: {
        type: String,
        enum: ['region', 'country', 'city', 'province', 'district'],
        required: true
    },
    code: {
        type: String
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    geo: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    view: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    metadata: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    faqs: [{
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Place', placeSchema);
