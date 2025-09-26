const mongoose = require('mongoose');
const mongoUri='mongodb://localhost:27017/vidhyaVichaar';

const connectDB = async (mongoUri) => {
try {
await mongoose.connect(mongoUri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log('MongoDB connected');
} catch (err) {
console.error(err);
process.exit(1);
}
};
module.exports=connectDB;