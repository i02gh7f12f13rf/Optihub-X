// Function to redirect to index.html if user is not logged in
function redirectToIndexIfNotLoggedIn() {
    // Check if the current page is login.html
    if (window.location.pathname.includes("login.html") || window.location.pathname.includes("admin.html")) {
        console.log("Checking authentication state...");
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("Auth state changed:", user);
            if (!user) {
                console.log("User not logged in, redirecting to index.html");
                // User is not logged in, redirect to index.html
                window.location.href = "index.html";
            } else {
                console.log("User is logged in.");
            }
        });
    }
}    
    const loginButtonStore = document.getElementById('loginButtonStore');
    // Get the modal element
    const modal = document.getElementById('loginModal');

    // Get the close button element
    const closeModalButton = document.getElementById('closeModal');

    const registerButton = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModalButton = document.getElementById('closeRegisterModal');


    function closeRegisterModal() {
        registerModal.classList.remove('show');
      }
      
      registerButton.addEventListener('click', function() {
        registerModal.classList.add('show');
      });
      
      closeRegisterModalButton.addEventListener('click', closeRegisterModal);

    window.addEventListener('click', function(event) {
        if (event.target === registerModal) {
          closeRegisterModal();
        }
      });


      // Add an event listener to the registration form
        const registrationForm = document.getElementById('registrationForm');

        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            try {
                // Check if password meets minimum length requirement
                if (password.length < 6) {
                    throw new Error("Password must be at least 6 characters long.");
                }

                // Register user with Firebase Authentication
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                
                // Optionally, you can redirect the user to another page after successful registration
                // window.location.href = 'welcome.html';
                
                console.log('User registered successfully:', userCredential.user.uid);
                
                // Hide the registration modal after successful registration
                closeRegisterModal();
                
                // Refresh the page
                window.location.reload();
            } catch (error) {
                console.error('Error registering user:', error.message);
                // Display error message to the user
                alert(error.message);
            }
        });

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('show'); // Hide the modal
    }

    // Function to close the modal
    function closeModal() {
    modal.classList.remove('show'); // Hide the modal
    }

    // Add click event listener to the login button
    loginButtonStore.addEventListener('click', function() {
    modal.classList.add('show'); // Show the modal
    });

    // Add click event listener to the close button
    closeModalButton.addEventListener('click', closeModal);

    // Add click event listener to the window
    window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal(); // Hide the modal if clicked outside
    }
    });

    function openLoginForm() {
    modal.classList.add('show'); // Show the login modal
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Get the element by its ID
        var tryItForButton = document.getElementById("Shoppy");
        
        // Add a click event listener
        tryItForButton.addEventListener("click", function() {
          // Redirect to the Shoppy link when clicked
          window.location.href = "https://shoppy.gg/product/fRE6e7H";
        });
      });

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
            var email = document.getElementById('username').value;
            var password = document.getElementById('password').value;
        
            // Check if both email and password are non-empty
            if (email && password) {
            // Call the signIn function with the provided email and password
            signIn(email, password);
            } else {
            // Display an error message to the user if email or password is empty
            alert("Please enter both email and password.");
            }
        });

            // Function to add a "Log out" button
            function addLogoutButton() {
                // Create a new button element
                var logoutButton = document.getElementById('logoutButton');
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
            }

            // Function to remove the "Log out" button
            function removeLogoutButton() {
                var logoutButton = document.getElementById('logoutButton');
                logoutButton.classList.add('hidden'); // Hide the logout button
            }

            function handleAuthStateChange() {
                firebase.auth().onAuthStateChanged(function(user) {
                    console.log("Auth state changed:", user);
                    if (user) {
                        // User is signed in, hide the register buttons
                        console.log("User is signed in");
            
                        // Check if user is an admin
                        user.getIdTokenResult()
                            .then(idTokenResult => {
                                if (idTokenResult.claims.rank && (idTokenResult.claims.rank === 'Admin' || idTokenResult.claims.rank.toLowerCase() === 'admin')) {
                                    // Show the admin panel button
                                    document.getElementById('adminPanelButton').classList.remove('hidden');
                                } else {
                                    // Hide the admin panel button for non-admin users
                                    document.getElementById('adminPanelButton').classList.add('hidden');
                                }
                            })
                            .catch(error => {
                                console.error("Error getting user token:", error);
                            });
            
                        // Hide the register buttons
                        document.querySelectorAll('.register:not(#loginButtonStore)').forEach(function(button) {
                            button.classList.add('hidden');
                        });
            
                        // Show the logout button
                        addLogoutButton();
                    } else {
                        // User is signed out, show the register buttons
                        console.log("User is signed out");
                        document.querySelectorAll('.register:not(#loginButtonStore)').forEach(function(button) {
                            button.classList.remove('hidden');
                        });
            
                        // Hide the logout button
                        removeLogoutButton();
                        
                        // Hide the admin panel button
                        document.getElementById('adminPanelButton').classList.add('hidden');
                    }
                });
            }

// Call the function when the page loads
window.onload = function() {
    handleAuthStateChange();

    redirectToIndexIfNotLoggedIn(); // Check authentication state when page loads
    // Periodically check authentication state (every 15 seconds) only if on login.html
    if (window.location.pathname.includes("login.html")) {
        setInterval(function() {
            console.log("Periodic check for authentication state...");
            redirectToIndexIfNotLoggedIn();
        }, 15000);
    }
};
function redirectToLogin() {
    window.location.href = "UserPanel.html";
}