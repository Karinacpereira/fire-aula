var database = firebase.database();

$(document).ready(function() {
  $(".sign-up-button").click(signUpClick);
  $(".sign-in-button").click(signInClick);
});

function signUpClick(event) {
  event.preventDefault();

  var name = $(".sign-up-name").val();
  var email = $(".sign-up-email").val();
  var password = $(".sign-up-password").val();

  createUser(name, email, password);
}

function signInClick(event) {
  event.preventDefault();

  var email = $(".sign-in-email").val();
  var password = $(".sign-in-password").val();

  loginUserAuth(email, password);
}

function createUser(name, email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(response) {
    if(response.operationType === "signIn") {
      var userId = response.user.uid;

      createUserInDB(userId, name, email);
      signInRedirect(userId);
    }
  })
  .catch(function(error) { handleError(error); });
}

function loginUserAuth(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(response) {
    if(response.operationType === "signIn") {
      var userId = response.user.uid;
      
      signInRedirect(userId);
    }
  })
  .catch(function(error) { handleError(error); });
}

function createUserInDB(id, name, email) {
  database.ref('users/' + id).set({
    name: name,
    email: email
  });
}

function signInRedirect(userId) {
  window.location = "todo.html?userId=" + userId;
}

function handleError(error) {
  alert(error.message);
  console.log(error.code, error.message);
}
