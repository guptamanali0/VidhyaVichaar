const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
text: { type: String, required: true, trim: true },
author: { type: String, default: 'Anonymous' },
status: {
type: String,
enum: ['unanswered', 'answered', 'important'],
default: 'unanswered',
},
createdAt: { type: Date, default: Date.now },
});


QuestionSchema.index({ text: 'text' });


module.exports = mongoose.model('Question', QuestionSchema);