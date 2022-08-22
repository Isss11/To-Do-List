document.addEventListener('DOMContentLoaded', init, false);
document.addEventListener('DOMContentLoaded', loadFromStorage, 'false');

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

   //Add to local storage
   saveToStorage(noteText.innerText); //sending just the text to be saved (we can create the element easily on our own)

   //reset entry value
   document.querySelector('#addNoteText').value = "";
}

//removes clicked parent element from the DOM
function removeNote (e) {
   deleteFromStorage(e.target.textContent); //removing from local storage

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

//Learned a lot about to-do list and storage creation from this video: https://www.youtube.com/watch?v=Ttf3CEsEwMQ&t=3768s
function saveToStorage(toDoText) {
   let toDos;

   if (window.localStorage.getItem('toDos') === null) {
      toDos = [];
   } else {
      toDos = JSON.parse(window.localStorage.getItem('toDos'));
   }

   toDos.push(toDoText); //adding element to toDos array and then saving the updated array to local storage
   window.localStorage.setItem('toDos', JSON.stringify(toDos));
}

function loadFromStorage(e) {
   let toDos;

   if (window.localStorage.getItem('toDos') === null) {
      toDos = [];
   } else {
      toDos = JSON.parse(window.localStorage.getItem('toDos'));
   }

   for (let i = 0; i < toDos.length; ++i) {
      let fullNote = document.createElement('div');
      let noteText = document.createElement('li');
      let deleteButton = document.createElement('button');
      let completeButton = document.createElement('button');

      deleteButton.type = "button";
      completeButton.type = "button"; //have to change the default value from 'submit' to a button

      deleteButton.innerHTML = "<i class='fa-solid fa-square-minus'></i>";
      completeButton.innerHTML = "<i class='fa-solid fa-check'></i>";
      
      noteText.innerText = toDos[i]; //getting text from local storage to load up on page

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
}

function deleteFromStorage(toDoText) {
      let toDos;

      toDos = JSON.parse(window.localStorage.getItem('toDos')); //this delete button is called when we have toDos, so I'm not going to check for NULL

      toDoIndex = toDos.indexOf(toDoText);
      toDos.splice(toDoIndex, 1); //removing array from index

      window.localStorage.setItem('toDos', JSON.stringify(toDos));
}

