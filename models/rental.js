const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);