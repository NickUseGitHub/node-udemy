const yargs = require('yargs')
const notes = require('./playgrounds/notes')

const cmd = yargs.argv
const method = cmd._[0]
const { title, body } = cmd

try {
    notes[method](cmd)
} catch(e) {
    console.log('error ', e)
}