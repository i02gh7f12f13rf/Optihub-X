

const activateToken = document.getElementById('Activate-Token');
const decisionStatus = document.getElementById('decisionStatus');
const banButton = document.getElementById('Ban-Button');
const unbanButton = document.getElementById('Unban-Button');

decisionStatus.addEventListener('change', function () {
  if (decisionStatus.value === 'Ban') {
    banButton.style.display = 'inline';
    unbanButton.style.display = 'none';
  } else if (decisionStatus.value === 'Unban') {
    banButton.style.display = 'none';
    unbanButton.style.display = 'inline';
  } else {
    banButton.style.display = 'none';
    unbanButton.style.display = 'none';
  }
});

let gameSelect = document.querySelector('select[name="Game-Select"]');
let updateButton = document.getElementById('UpdateBtn');
let changeSubInput = document.getElementById('Change-Sub');
gameSelect.addEventListener('change', function() {
    if (gameSelect.value !== '') {
      updateButton.style.display = 'block';
      updateButton.disabled = false;
      changeSubInput.style.display = 'block';
      activateToken.style.display = "block";
    } else {
      updateButton.style.display = 'none';
      updateButton.disabled = true;
      changeSubInput.style.display = 'none';
      activateToken.style.display = "none";
    }
  });

document.querySelector('.Update-Button').addEventListener('click', function() {

    let inputValue = document.querySelector('#Change-Sub').value.trim();

    if (!isNaN(inputValue)) {
      let numberValue = parseInt(inputValue, 10);

      if (numberValue >= 0 && numberValue <= 365) {
        console.log('Great');
      } else {
        alert('Please input a number between 0 - 365');
      }
    } else {
      alert('Please input a valid number.');
    }
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the game select element
    var gameSelect = document.querySelector('select[name="Game-Select"]');
    // Get a reference to the decision status select element
    var decisionStatus = document.querySelector('select[name="Decision-Status"]');
  
    // Add an event listener to the game select element to detect changes
    gameSelect.addEventListener('change', function() {
      // Check if the selected value is empty (no game selected)
      if (gameSelect.value === '') {
        // If no game is selected, hide the decision status
       // decisionStatus.style.display = 'none';
      } else {
        // If a game is selected, show the decision status
       // decisionStatus.style.display = 'block';
      }
    });
  });