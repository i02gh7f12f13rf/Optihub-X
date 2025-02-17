// Get the login button element
const loginButton = document.getElementById('loginButton');

// Get the modal element
const modal = document.getElementById('loginModal');

// Get the close button element
const closeModalButton = document.getElementById('closeModal');


// Add an event listener to the registration form
const registrationForm = document.getElementById('registrationForm');

document.addEventListener('DOMContentLoaded', function() {
  // Get the register button element
  const registerButton = document.getElementById('registerButton');
  console.log('Register button:', registerButton); // Log the register button

  // Get the register modal element
  const registerModal = document.getElementById('registerModal');
  console.log('Register modal:', registerModal); // Log the register modal

  // Function to open the register modal
  function openRegisterModal() {
    console.log('Opening register modal'); // Log when opening the modal
  registerModal.classList.add('show'); // Show the register modal
  }

  // Add click event listener to open the register modal when the register button is clicked
  registerButton.addEventListener('click', openRegisterModal);

  // Optionally, add functionality to close the register modal when the close button is clicked
  const closeRegisterModalButton = document.getElementById('closeRegisterModal');
  closeRegisterModalButton.addEventListener('click', function() {
    console.log('Closing register modal'); // Log when closing the modal
    registerModal.classList.remove('show'); // Hide the register modal
  });

  // Optionally, add functionality to close the register modal when clicked outside the modal
  window.addEventListener('click', function(event) {
    if (event.target === registerModal) {
      console.log('Clicked outside register modal'); // Log when clicked outside the modal
      registerModal.classList.remove('show'); // Hide the register modal if clicked outside
    }
  });
});









































// Add click event listener to the login button
loginButton.addEventListener('click', function() {
  modal.classList.add('show'); // Show the modal
  registerModal.classList.remove('show'); // Hide the registration modal
});

// Add click event listener to the close button
closeModalButton.addEventListener('click', function() {
  modal.classList.remove('show'); // Hide the modal
});


// Add click event listener to the window
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.classList.remove('show'); // Hide the modal if clicked outside
  }
});

function openLoginForm() {
    // Check if the user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // User is logged in, redirect to shoppy.gg
          window.location.href = "https://shoppy.gg/product/fRE6e7H";
      } else {
          // User is not logged in, show the login modal
          modal.classList.add('show');
      }
  });
}


// Function to sign in user with email and password
function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      var user = userCredential.user;
      // Redirect the user to the support page upon successful login
      window.location.href = "support.html";
    })
    .catch((error) => {
      // Handle authentication errors
      var errorCode = error.code;
      // Check if the error is due to invalid credentials
      if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        // Display a generic error message to the user
        alert("Incorrect email or password. Please try again.");
      } else {
        // For other errors, display the Firebase error message
        alert("The credentials you entered are incorrect. Please try again");
      }
    });
}

// Modify the login form submission event handler
document.querySelector('.login-form form').addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the email and password values from the form
  var usn = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Check if both email and password are non-empty
  if (usn && password) {
    // Call the signIn function with the provided email and password
    signIn(usn, password);
  } else {
    // Display an error message to the user if email or password is empty
    alert("Please enter both email and password.");
  }
});







function addLogoutButton() {
  // Create a new button element
  var logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.classList.remove('hidden'); // Show the logout button
    // Add click event listener to the logout button
    logoutButton.addEventListener('click', function() {
      // Sign out the user
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("User signed out successfully.");
      }).catch(function(error) {
        // An error happened.
        console.error("Sign out error:", error);
      });
    });
  } else {
    console.error("Logout button not found.");
  }
}

function removeLogoutButton() {
  var logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.classList.add('hidden'); // Hide the logout button
  } else {
    console.error("Logout button not found.");
  }
}






function handleAuthStateChange() {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log("Auth state changed:", user);
    if (user) {
      // User is signed in, hide the register buttons
      console.log("User is signed in");
      document.querySelectorAll('.register:not(#loginButtonStore)').forEach(function(button) {
        button.classList.add('hidden');
      });
    addLogoutButton(); // Show the logout button and attach logout functionality
    } else {
      // User is signed out
      console.log("User is signed out");
      document.querySelectorAll('.register:not(#loginButtonStore)').forEach(function(button) {
        button.classList.remove('hidden');
    });
    removeLogoutButton(); // Hide the logout button
    }
  });
}


// Call the function when the page loads
window.onload = function() {
  handleAuthStateChange();
};
function redirectToLogin() {
  window.location.href = "login.html";
}