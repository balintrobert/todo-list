const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

//  @route    POST api/todos
//  @desc     Create a todo
//  @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newTodo = {
        text: req.body.text,
        done: req.body.done,
      };
      await user.todos.push(newTodo);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

//  @route    GET api/todos
//  @desc     Get all todos from auth user
//  @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const todos = user.todos;
    if (todos.length === 0) {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

//  @route    GET api/todos/:id
//  @desc     Get todo by ID
//  @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const todo = user.todos.filter((todo) => todo.id === req.params.id);
    if (todo.length === 0) {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    res.status(500).send('Server error.');
  }
});

//  @route    DELETE api/todos/:id
//  @desc     Delete a todo
//  @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const toRemove = user.todos.filter((todo) => todo.id === req.params.id);
    if (toRemove.length === 0) {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    user.todos = user.todos.filter((todo) => todo.id !== req.params.id);
    await user.save();
    res.json(user.todos);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    res.status(500).send('Server error.');
  }
});

//  @route    PATCH api/todos/:id
//  @desc     Edit a todo
//  @access   Private
router.patch('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const toEdit = user.todos.filter((todo) => todo.id === req.params.id);
    if (toEdit.length === 0) {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    const { text, done = false } = req.body;
    user.todos.forEach((todo) => {
      if (todo.id === req.params.id) {
        todo.text = text;
        todo.done = done;
      }
    });
    await user.save();
    res.json(user.todos);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found.' });
    }
    res.status(500).send('Server error.');
  }
});

module.exports = router;
