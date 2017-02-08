const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const fileName = 'notes-data.js'

function getAllNotes() {
  const pathFile = path.resolve(__dirname, `./${fileName}`)

  try {
    const notes = fs.readFileSync(pathFile, 'utf-8')
    return JSON.parse(notes)
  } catch (e) {
    return []
  }
}

function writeFile(notes) {
  const pathFile = path.resolve(__dirname, `./${fileName}`)

  try {
    fs.writeFileSync(pathFile, JSON.stringify(notes))
    console.log('--------------------')
    console.log('writeFile completed!')
    console.log('--------------------')
  } catch (e) {
    throw (e)
  }
}

function addFile(title, body) {
  const notes = getAllNotes()
  const note = { title, body }

  if (!_.isEmpty(notes.filter(n => n.title === title))) {
    console.log('cannot write file because note is duplicated')
    return
  }

  notes.push(note)
  writeFile(notes)
}

function editFile(title, body) {
  const notes = getAllNotes()
  const note = { title, body }

  if (_.isEmpty(notes.filter(n => n.title === note.title))) {
    debugger
    console.log('cannot edit file because note is not exist')
    return
  }

  const newNote = notes.map(n=>{
    if (n.title !== note.title) {
      return n
    } else {
      return note
    }
  })
  debugger

  writeFile(newNote)
}

function removeFile(title) {
  const notes = getAllNotes()

  const newNote = notes.filter(n=> n.title !== title)
  writeFile(newNote)
}

function get(cmd) {
  const notes = getAllNotes()
  const {title} = cmd
  return _.head(notes.filter(note => note.title === title))
}

function list() {
  return getAllNotes()
}

function add(cmd) {
  const {title, body} = cmd
  addFile(title, body)
  return 'new note'
}

function edit(cmd) {
  const {title, body} = cmd
  editFile(title, body)
  return 'update note'
}

function remove(cmd) {
  const {title} = cmd
  removeFile(title)
  return 'remove note'
}

module.exports = {
  add,
  edit,
  list,
  remove
}