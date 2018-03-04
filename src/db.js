import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = mongoose.createConnection('mongodb://localhost/orderingApp');

db.on('error', err => console.log(err.message));
db.once('open', () => console.log('Successfully connected to database'));

export default db;