const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const UserId = req.user.id
  User.findByPk(UserId)
    .then((user) => {
      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId }
      })
    })
    .then((todos) => { return res.render('index', { todos }) })
    .catch(error => { return res.status(422).json(error) })
})

module.exports = router