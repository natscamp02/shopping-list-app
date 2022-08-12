const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        name: String,
        category: String,
        quantity: Number,
        cost: Number,
    },
    { collection: 'list' }
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
