const mongoose = require('mongoose');
const {Schema} = mongoose;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
