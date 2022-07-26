
document.addEventListener('DOMContentLoaded', init, false);

 function init (e) {
    document.getElementById('addNoteButton').addEventListener('click', addNote, false); //references the button for clicks
    deleteButtonListener();
   }

function deleteButtonListener(e) { //we can only add event listeners to a collection via a loop
   deleteButtonNodes = document.getElementsByClassName('deleteButton');

   for (var i = 0; i < deleteButtonNodes.length; ++i) {
      deleteButtonNodes[i].addEventListener('click', removeNote, false); //going through each node and giving it an event listener
   }
}

 function addNote(e) { //the css document makes this margin auto -- to take up additinoal space on left and right equally.
    document.getElementById('noteList').insertAdjacentHTML("beforeend", 
    "<div class='fullNote'><li class='note'>" + document.getElementById('addNoteText').value + "</li> <input class='deleteButton' type='button' value='Delete'></div>"); //this adds in the element into the list

   deleteButtonListener(); //updating event listeners.
 } 

 function removeNote(e) { //index getting portion is from https://stackoverflow.com/questions/5913927/get-child-node-index
   fullNotesCollection = document.getElementsByClassName('fullNote');

   fullNotesCollection[0].remove(); //FIXME
 }
 /*Plan for Function removeNote:
 
 None of these notes have a specific ID attached to them, so we will need to get the index of the child of the ul element.
 Thus we will use that index to then delete a specific element.
 We will need an event listener for all of the buttons, based on class -- then we will call a function that will get the index
 to delete the element.
 */