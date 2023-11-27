const express = require('express')
const router = express.Router();
const questionController = require('../controller/questionController');

router.get('/', questionController.getAllFaQ);
router.get('/:id', questionController.getByIdFaQ);
router.get('/question/:question', questionController.getByQuestionFaQ);
router.get('/faq/:keyword', questionController.getByQuestionFaQByKeyword);
router.post('/', questionController.createFaQ);

module.exports = router;