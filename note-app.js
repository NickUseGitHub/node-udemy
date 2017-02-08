const yargs = require('yargs')
const notes = require('./playgrounds/notes')

const cmd = yargs.argv
const command = cmd._[0]
const { title, body } = cmd

try {
    notes[command](cmd)
} catch(e) {
    console.log('error ', e)
}