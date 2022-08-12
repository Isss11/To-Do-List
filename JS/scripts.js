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
   let editButton = document.createElement('button');

   deleteButton.type = "button";
   completeButton.type = "button"; //have to change the default value from 'submit' to a button
   editButton.type = "button";

   deleteButton.innerHTML = "<i class='fa-solid fa-square-minus'></i>";
   completeButton.innerHTML = "<i class='fa-solid fa-check'></i>";
   editButton.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
   
   noteText.innerText = document.querySelector('#addNoteText').value;

   fullNote.appendChild(noteText); //the div is the parent of these 3 elements in the note
   fullNote.appendChild(deleteButton);
   fullNote.appendChild(completeButton);
   fullNote.appendChild(editButton);

   document.querySelector('#noteList').appendChild(fullNote); //adding the new div with its contents to the list

   fullNote.classList.add('toDo');
   noteText.classList.add('noteText');
   completeButton.classList.add('completeButton');
   deleteButton.classList.add('deleteButton');
   editButton.classList.add('editButton');

   deleteButton.addEventListener('click', removeNote, false);
   completeButton.addEventListener('click', markNote, false);
   editButton.addEventListener('click', editNote, false);

   completeButton.value = false; // button is not yet clicked (false)

   //reset entry value
   document.querySelector('#addNoteText').value = "";
}

//removes clicked parent element from the DOM
function removeNote (e) {
   if (e.target.tagName == 'I') { //if we click on the icon
      e.target.parentNode.parentNode.remove();
   } else {
      e.target.parentNode.remove();
   }
}

//marks or unmarks clicked parent element
function markNote (e) {
   if (e.target.tagName == 'I') { //if we click on the icon
      if (e.target.parentNode.value == "false") { // I compared this with a string, since it appears to implicity convert the boolean to a string
         e.target.parentNode.parentNode.firstChild.style.textDecoration = 'line-through';
   
         e.target.parentNode.parentNode.firstChild.style.opacity = 0.5;

         e.target.parentNode.value = true;
   
      } else {
         e.target.parentNode.parentNode.firstChild.style.textDecoration = 'none';

         e.target.parentNode.parentNode.firstChild.style.opacity = 1.0;
   
         e.target.parentNode.value = false;
      }
   } else {
      if (e.target.value == "false") { // I compared this with a string, since it appears to implicity convert the boolean to a string
         e.target.parentNode.firstChild.style.textDecoration = 'line-through';

         e.target.parentNode.firstChild.style.opacity = 0.5;
   
         e.target.value = true;
   
      } else {

         e.target.parentNode.firstChild.style.textDecoration = 'none';

         e.target.parentNode.firstChild.style.opacity = 1.0;
   
         e.target.value = false;
      }
   }
}

//this allows you to edit the note by showing the edit form and minimizing the other form (only for initiating edit)
function editNote (e) {
   let textField;

   if (e.target.tagName == 'I') { //fixing for the issue with icon referencing
      textField = e.target.parentNode.parentNode.firstChild;

   } else {
      textField = e.target.parentNode.firstChild;
   }

   document.querySelector('#toDoList').style.display = 'none';
   document.querySelector('#editToDo').style.display = 'flex';

   document.querySelector('#editNoteText').value = textField.textContent; //getting text element value

   document.querySelector('#doneEditButton').addEventListener('click', submitEdit, 'false');
   document.querySelector('#cancelEditButton').addEventListener('click', cancelEdit, 'false');
}

//this function cancels the edit imposed, by removing the edit form and going back to the original page
function cancelEdit(e) {
   document.querySelector('#toDoList').style.display = 'flex';
   document.querySelector('#editToDo').style.display = 'none';
}


//this function changes the value of the li element to reflect what is in the editToDo form
function submitEdit(e) {
   //Function stub
}