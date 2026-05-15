const { genSalt } = require('bcrypt');
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    difficulty: { type: String, required: true },
    players: { type: String, required: true },
    length: { type: String, required: true },
    status: { type: String, default: 'available' }
});
module.exports = mongoose.model('Game', gameSchema);