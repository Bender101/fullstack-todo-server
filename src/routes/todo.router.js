const todoRouter = require("express").Router();
const todoController = require('../controllers/todo.controller')


todoRouter.get('/alltodos', todoController.getTodos)
todoRouter.post('/addtodo',todoController.addTodo)
todoRouter.delete('/removetodo/:id',todoController.removeTodo)
todoRouter.patch('/changestatus/',todoController.changeStatus)
todoRouter.put('/updatetodo/',todoController.updateTodo)

module.exports = todoRouter;
