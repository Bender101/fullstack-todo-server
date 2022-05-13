const { Task } = require("../../db/models");

const getTodos = async (req, res) => {
  try {
    const getTodos = await Task.findAll({
      order: [["id", "DESC"]],
    });
    res.json(getTodos);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const addTodo = async (req, res) => {
  try {
    const { name, email, text, status } = req.body;

    if (name && email && text) {
      const test = await Task.create({ name, email, text, status });
      res.json(test);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({ where: { id: +id } });
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const updatedStatus = await Task.findOne({ where: { id: +id } });
    console.log(updatedStatus.status);
    if (!updatedStatus.status) {
      await Task.update({ status: true }, { where: { id: +id } });
    } else {
      await Task.update({ status: false }, { where: { id: +id } });
    }

    res.json(updatedStatus);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id, editInput } = req.body;
    await Task.update({ text: editInput }, { where: { id: +id } });
    const updatedTodo = await Task.findOne({ where: { id: +id } });
   res.json({text: updatedTodo.text, id})
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { addTodo, getTodos, removeTodo, changeStatus, updateTodo };