
document.addEventListener('DOMContentLoaded', init, false);

 function init (e) {
    document.getElementById('addNoteButton').addEventListener('click', addNote, false); //references the button for clicks
}

 function addNote(e) { //the css document makes this margin auto -- to take up additinoal space on left and right equally.
    document.getElementById('noteList').insertAdjacentHTML("beforeend", 
    "<div><li class='note'>" + document.getElementById('addNoteText').value + "</li> <input class='deleteButton' type='button' value='Delete'></div>"); //this adds in the element into the list
 } 