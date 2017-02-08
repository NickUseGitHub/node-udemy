const fs = require('fs')
const _ = require('lodash')
const fileName = 'notes-data.js'

function getAllNotes() {
  try {
    const notes = fs.readFileSync(`./${fileName}`, 'utf-8')
    return notes
  } catch (e) {
    return []
  }
}

function writeFile(title, body) {
  const notes = getAllNotes()
  const note = { title, body }

  if (_.isEmpty(notes.filter(n => n.title === title))) {
    console.log('cannot write file because note is duplicated')
    return
  }

  notes.push(note)

  try {
    fs.writeFileSync(`./${fileName}`, JSON.stringify(notes))
    console.log('writeFile completed!')
    console.log('--------------------')
  } catch (e) {
    throw (e)
  }
}

function get(cmd) {
  const notes = getAllNotes()
  const {title} = cmd
  return _.head(notes.filter(note => note.title === title))
}

function add(cmd) {
  const {title, body} = cmd
  writeFile(title, body)
  return 'new note'
}

function edit(cmd) {
  console.log('editNote', cmd)
  return 'update note'
}

function remove(cmd) {
  console.log('removeNote', cmd)
  return 'remove note'
}

module.exports = {
  add,
  edit,
  remove
}