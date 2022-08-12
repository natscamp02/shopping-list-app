const Category = require('../models/Category');
const { catchAsync } = require('../utils');

exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: categories,
    });
});

exports.getCategoryById = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) return next(new Error('Category not found'));

    res.status(200).json({
        status: 'success',
        data: category,
    });
});

exports.createCategory = catchAsync(async (req, res) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newCategory,
    });
});

exports.updateCategory = catchAsync(async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedCategory) return next(new Error('Category not found'));

    res.status(200).json({
        status: 'success',
        data: updatedCategory,
    });
});

exports.deleteCategory = catchAsync(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) return next(new Error('Category not found'));

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
