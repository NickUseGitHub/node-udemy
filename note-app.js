const yargs = require('yargs')
const notes = require('./playgrounds/notes')
const _ = require('lodash')

const titleOptions = {
                  describe: 'Title of note',
                  demand: true,
                  alias: 't'
                }
const bodyOptions = {
                  describe: 'Body of note',
                  demand: true,
                  alias: 'b'
                }

const cmd = yargs
              .command('add', 'add note', {
                title: titleOptions,
                body: bodyOptions
              })
              .command('edit', 'edit note', {
                title: titleOptions,
                body: bodyOptions
              })
              .command('remove', 'remove note', {
                title: titleOptions
              })
              .command('get', 'get note', {
                title: titleOptions
              })
              .command('list', 'print all notes')
              .help()
              .argv

const command = cmd._[0]
const { title, body } = cmd

try {
  if (!_.has(notes, command)) {
    throw `no command:(${command}) for note-app`
  }

  notes[command](cmd)
} catch (e) {
  console.log(`error -- ${e}`)
}