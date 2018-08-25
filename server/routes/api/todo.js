const express = require('express');
const router = express.Router();
const passport = require('passport');

const Todo = require('../../models/Todo');

// @route   GET api/todo/test
// @desc    Tests todo route
// @access  Public
router.get('/test', (req, res) => {
  res.json({abc: 123});
});

// @route   GET api/todos
// @desc    Get all todos of user
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const todos = await Todo.find({user: req.user.id});
    res.json(todos);
  },
);

// @route   POST api/todos/delete
// @desc    remove todo
// @access  Private
router.post(
  '/save',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {name, id} = req.body;

    let todo = null;
    if (id) {
      todo = await Todo.findById(id);
      todo.name = name;
    } else {
      todo = new Todo({name, user: req.user.id});
    }
    await todo.save();
    res.json(todo);
  },
);

// @route   POST api/todos/save
// @desc    Get all todos of user
// @access  Private
router.post(
  '/delete',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {id} = req.body;

    await Todo.findByIdAndRemove(id);
    res.json({success: true});
  },
);

module.exports = router;
