const Question = require('../models/Question');


exports.getAll = async (req, res) => {
try {
const filter = {};
const { status } = req.query;
if (status) filter.status = status;
const questions = await Question.find(filter).sort({ createdAt: -1 });
res.json(questions);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};


exports.create = async (req, res) => {
try {
const { text, author } = req.body;
if (!text || !text.trim()) return res.status(400).json({ error: 'Question text required' });


// prevent duplicates (simple check)
const existing = await Question.findOne({ text: text.trim() });
if (existing) return res.status(409).json({ error: 'Duplicate question' });


const q = new Question({ text: text.trim(), author: author || 'Anonymous' });
await q.save();
res.status(201).json(q);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};


exports.updateStatus = async (req, res) => {
try {
const { id } = req.params;
const { status } = req.body;
if (!['unanswered', 'answered', 'important'].includes(status))
return res.status(400).json({ error: 'Invalid status' });
const q = await Question.findByIdAndUpdate(id, { status }, { new: true });
if (!q) return res.status(404).json({ error: 'Not found' });
res.json(q);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};


exports.deleteAll = async (req, res) => {
try {
// optionally add a confirmation check in real apps
await Question.deleteMany({});
res.json({ ok: true });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};


exports.deleteOne = async (req, res) => {
try {
const { id } = req.params;
const q = await Question.findByIdAndDelete(id);
if (!q) return res.status(404).json({ error: 'Not found' });
res.json({ ok: true });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};