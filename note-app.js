const yargs = require('yargs')
const notes = require('./playgrounds/notes')
const _ = require('lodash')

const cmd = yargs
              .command('add', 'add note', {
                title: {
                  describe: 'Title of note',
                  demand: true,
                  alias: 't'
                },
                body: {
                  describe: 'Body of note',
                  demand: true,
                  alias: 'b'
                }
              })
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