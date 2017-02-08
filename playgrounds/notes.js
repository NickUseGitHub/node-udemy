const fs = require('fs')

function add(cmd) {
    console.log('addNote', cmd)
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