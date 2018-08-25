const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../../models/Task');

// @route   GET api/tasks/test
// @desc    Tests task route
// @access  Public
router.get('/test', (req, res) => {
  res.json({abc: 123});
});

// @route   GET api/tasks
// @desc    Get all tasks of todo
// @access  Private
router.get(
  '/:todoId',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {todoId} = req.params;
    const tasks = await Task.find({user: req.user.id, todo: todoId});
    console.log(tasks);
    res.json(tasks);
  },
);

// @route   POST api/tasks/save
// @desc    Get all tasks under todo list
// @access  Private
router.post(
  '/save',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    console.log(req.body);
    const {description, id, todoId} = req.body;

    let task = null;
    if (id) {
      task = await Task.findOne({_id: id, todo: todoId, user: req.user.id});
      task.description = description;
    } else {
      task = new Task({description, todo: todoId, user: req.user.id});
    }
    await task.save();
    res.json(task);
  },
);

// @route   POST api/tasks/mark
// @desc    mark task completed/uncompleted
// @access  Private
router.post(
  '/mark',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    console.log(req.body);
    const {id, todoId, completed} = req.body;

    let task = await Task.findOne({_id: id, todo: todoId, user: req.user.id});
    task.completed = completed;
    await task.save();
    res.json(task);
  },
);

// @route   POST api/tasks/delete
// @desc    remove task
// @access  Private
router.post(
  '/delete',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {id, todoId} = req.body;

    const task = await Task.findOne({_id: id, todo: todoId, user: req.user.id});
    await task.remove();
    res.json({success: true});
  },
);

module.exports = router;
