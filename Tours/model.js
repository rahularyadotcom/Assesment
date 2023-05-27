const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }],
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }],
    languages: [{
        type: String
    }],
    coverImage: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    sku: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
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
    itinerary: [{
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

module.exports = mongoose.model('Tour', tourSchema);
