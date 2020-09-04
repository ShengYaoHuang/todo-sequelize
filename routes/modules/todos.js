const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => { return res.status(422).json(error) })
})


router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => { return res.status(422).json(error) })
})

router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then((todo) => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => { return res.status(422).json(error) })
})

router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({
    where: { id, UserId }
  })
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => { return res.status(422).json(error) })
})

router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then((todo) => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => { return res.status(422).json(error) })
})

module.exports = router