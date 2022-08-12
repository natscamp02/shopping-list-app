const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router
    .route('/')
    .get(listController.getAllItems)
    .post(listController.createItem);
router
    .route('/:id')
    .get(listController.getItemById)
    .put(listController.updateItem)
    .delete(listController.deleteItem);

module.exports = router;
