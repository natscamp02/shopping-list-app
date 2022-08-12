const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        name: String,
        quantity: Number,
        cost: Number,

        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
        },
    },
    { collection: 'list' }
);

ItemSchema.pre(/^find/, function (next) {
    this.populate('category');
    next();
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
