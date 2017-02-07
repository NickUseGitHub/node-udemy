function addNote() {
    console.log('addNote')
    return 'new note'
}

function editNote() {
    console.log('editNote')
    return 'update note'
}

function deleteNote() {
    console.log('deleteNote')
    return 'delete note'
}

module.exports = {
    addNote,
    editNote,
    deleteNote
}