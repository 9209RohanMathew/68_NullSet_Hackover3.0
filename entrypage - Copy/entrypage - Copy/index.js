// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBzeb0LWm2WXfVoXuqAu14a3JJP5mrisBs",
    authDomain: "try20-43354.firebaseapp.com",
    projectId: "try20-43354",
    storageBucket: "try20-43354.appspot.com",
    messagingSenderId: "386333206386",
    appId: "1:386333206386:web:e1635153843d6ec26f1feb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    phone_no = document.getElementById('phone_no').value
    organiser_yes_option = document.getElementById('organiser_yes_option').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(phone_no) == false || validate_field(organiser_yes_option) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        phone_no : phone_no,
        organiser_yes_option : organiser_yes_option,
        last_login : Date.now()
      }

      
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    organiser = document.getElementById('organiser_yes_option').value 
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // redirect
      alert('User Logged In')
      //alert(milk_before_cereal)

      if(organiser_yes_option == 'no' || organiser_yes_option == 'No' || organiser_yes_option == 'N'|| organiser_yes_option == 'n' )
      {
        window.location.replace("https://www.google.com/");
      }
      else if(organiser == 'yes' || organiser_yes_option == 'Yes' || organiser_yes_option == 'Y'|| organiser_yes_option == 'y' )
      {
        window.location.replace("https://www.quora.com/");
      }
      else
      {
        window.location.replace("http://www.frcrce.ac.in/");
      }
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }