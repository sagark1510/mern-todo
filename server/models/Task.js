const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  todo: {
    type: Schema.Types.ObjectId,
    ref: 'todos',
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model('tasks', TaskSchema);
