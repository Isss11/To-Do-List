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
   
         e.target.parentNode.parentNode.firstChild.style.opacity = 0.5; //decreasing opacity when marked off

         e.target.parentNode.value = true;
   
      } else {
         e.target.parentNode.parentNode.firstChild.style.textDecoration = 'none';

         e.target.parentNode.parentNode.firstChild.style.opacity = 1.0; //resetting opacity
   
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
   let textField, fullNote;

   if (e.target.tagName == 'I') { //fixing for the issue with icon referencing
      textField = e.target.parentNode.parentNode.firstChild;
      fullNote = e.target.parentNode.parentNode;

   } else {
      textField = e.target.parentNode.firstChild;
      fullNote = e.target.parentNode;
   }

   document.querySelector('#toDoList').style.display = 'none';
   document.querySelector('#editToDo').style.display = 'flex';

   document.querySelector('#editNoteText').value = textField.textContent; //getting text element value

   //disabling relevant fields
   fullNote.style.opacity = 0.5;
   for (let i = 0; i < fullNote.childNodes.length; ++i) {
      if (fullNote.childNodes[i].tagName == 'BUTTON') { //tagName returns the value in UPPERCASE
         fullNote.childNodes[i].disabled = true;
      }
   }
   
   document.querySelector('#doneEditButton').addEventListener('click', submitEdit(textField, fullNote), 'false');
   document.querySelector('#cancelEditButton').addEventListener('click', returnEdit(fullNote), 'false');
   

}

//this function cancels the edit imposed, by removing the edit form and going back to the original page
function returnEdit(noteElement) { 
   return function curriedResetNote(e) { //seems like this is being called when event exists
      resetNote(noteElement);
   }
   
}


//this function changes the value of the li element to reflect what is in the editToDo form
https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function?noredirect=1&lq=1
function submitEdit(textField, noteElement) {
   return function changeNote(e) { //curried function to be able to pass parameter (see link above)
      textField.textContent = document.querySelector('#editNoteText').value;

      resetNote(noteElement); //returning back to regular screen
   }
}

function resetNote(noteElement) {
   document.querySelector('#toDoList').style.display = 'flex';
   document.querySelector('#editToDo').style.display = 'none';

   noteElement.style.opacity = 1.0;

   for (let i = 0; i < noteElement.childNodes.length; ++i) {
      if (noteElement.childNodes[i].tagName == 'BUTTON') { //tagName returns the value in UPPERCASE
         noteElement.childNodes[i].disabled = false;
      }
   }
}