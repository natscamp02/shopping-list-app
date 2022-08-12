const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        collection: 'categories',
    }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
