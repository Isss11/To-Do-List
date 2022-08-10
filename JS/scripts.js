document.addEventListener('DOMContentLoaded', init, false);

function init (e) {
    document.querySelector('#addNoteButton').addEventListener('click', checkNote, false); //references the button for clicks
   }

//Checks if we can actually create a note (if note is actually available) 
function checkNote(e) {
   if (document.querySelector('#addNoteText').value != "") { //as long as there is a note, call the function
      addNote(e);
   } 
}

//adds a wrapper element (div) that includes the inputted text, delete button and complete button with event listeners
function addNote(e) {

   let fullNote = document.createElement('div');
   let noteText = document.createElement('li');
   let deleteButton = document.createElement('button');
   let completeButton = document.createElement('button');

   deleteButton.type = "button";
   completeButton.type = "button"; //have to change the default value from 'submit' to a button

   deleteButton.innerHTML = "<i class='fa-solid fa-square-minus'></i>";
   completeButton.innerHTML = "<i class='fa-solid fa-check'></i>";
   noteText.innerText = document.querySelector('#addNoteText').value;

   fullNote.appendChild(noteText); //the div is the parent of these 3 elements in the note
   fullNote.appendChild(deleteButton);
   fullNote.appendChild(completeButton);

   document.querySelector('#noteList').appendChild(fullNote); //adding the new div with its contents to the list

   fullNote.classList.add('toDo');
   noteText.classList.add('noteText');
   completeButton.classList.add('completeButton');
   deleteButton.classList.add('deleteButton');

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
      e.target.parentNode.firstChild.style.textDecoration = 'line-through';

      e.target.value = true;

   } else {
      e.target.parentNode.firstChild.style.textDecoration = 'none';

      e.target.value = false;
   }
}