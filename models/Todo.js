'use strict';

var mongoose = require('mongoose');

var Todo;

var todoSchema = new mongoose.Schema({
  task: String,
  completed: {type: Boolean, default: false},
  date: Date
});

Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
