const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    user_id: Number,
    symbol: String,
    shares: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: Number,
    timestamp: Number
}, { timestamps: true });

module.exports = mongoose.model("Trade", tradeSchema);
