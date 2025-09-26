const express = require('express');
const router = express.Router();
const controller = require('../controllers/questionsController');


router.get('/', controller.getAll);
router.post('/', controller.create);
router.patch('/:id/status', controller.updateStatus);
router.delete('/', controller.deleteAll);
router.delete('/:id', controller.deleteOne);


module.exports = router;