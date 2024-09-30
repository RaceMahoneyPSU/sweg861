const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    street: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    years: { type: String },
    reason: { type: String },
});

module.exports   = mongoose.model('FormEntry', formEntrySchema, 'user_data');