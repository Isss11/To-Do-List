document.addEventListener('DOMContentLoaded', init, false);

function init (e) {
    document.querySelector('#addNoteButton').addEventListener('click', addNote, false); //references the button for clicks
   }

function addNote(e) {
   let fullNote = document.createElement('div');
   let deleteButton = document.createElement('button');e
   let completeButton = document.createElement('button');
   let noteText = document.createElement('li');

   deleteButton.type = "button";
   completeButton.type = "button"; //have to change the default value from 'submit' to a button

   deleteButton.innerText = "Delete";
   completeButton.innerText = "Finished";
   noteText.innerText = document.querySelector('#addNoteText').value;

   fullNote.appendChild(deleteButton);
   fullNote.appendChild(completeButton);
   fullNote.appendChild(noteText); //the div is the parent of these 3 elements in the note

   document.querySelector('#noteList').appendChild(fullNote); //adding the new div with its contents to the list

   fullNote.classList.add('toDo');
   completeButton.classList.add('completeButton');
   deleteButton.classList.add('deleteButton');
   noteText.classList.add('noteText');

   deleteButton.addEventListener('click', removeNote, false);
   completeButton.addEventListener('click', markNote, false);

   completeButton.value = false; // button is not yet clicked (false)
}

//removes clicked parent element from the DOM
function removeNote (e) {
   e.target.parentNode.remove();
}

//marks or unmarks clicked parent element
function markNote (e) {

   if (e.target.value == "false") { // I compared this with a string, since it appears to implicity convert the boolean to a string
      e.target.parentNode.style.textDecoration = 'line-through';

      e.target.value = true;

   } else {
      e.target.parentNode.style.textDecoration = 'none';

      e.target.value = false;
   }
}