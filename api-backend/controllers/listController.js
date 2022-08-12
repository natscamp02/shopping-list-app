const Item = require('../models/Item');
const { catchAsync } = require('../utils');

exports.getAllItems = catchAsync(async (req, res) => {
    const items = await Item.find();

    res.status(200).json({
        status: 'success',
        results: items.length,
        data: items,
    });
});

exports.getItemById = catchAsync(async (req, res, next) => {
    const item = await Item.findById(req.params.id);

    if (!item) return next(new Error('No item found'));

    res.status(200).json({ status: 'success', data: item });
});

exports.createItem = catchAsync(async (req, res) => {
    const data = {
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        cost: req.body.cost,
    };
    const newItem = await Item.create(data);

    res.status(201).json({ status: 'success', data: newItem });
});

exports.updateItem = catchAsync(async (req, res, next) => {
    const data = {
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        cost: req.body.cost,
    };
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, data, {
        new: true,
    });

    if (!updatedItem) return next(new Error('Item not found'));

    res.status(200).json({ status: 'success', data: updatedItem });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) return next(new Error('No item found'));

    res.status(204).json({ status: 'success', data: null });
});
