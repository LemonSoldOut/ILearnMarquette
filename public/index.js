//connects to firesotre
var firestore = firebase.firestore();
//references the user documents within the ilearn collection
const docRef = firestore.collection("ilearn").doc("users");


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //displaying the logged in screen
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("homepage_div").style.display = "none";
      document.getElementById("createuser_div").style.display = "none";
      document.getElementById("class_homepage_div").style.display = "none";
      

      //get the User ID assigned to the user in Firebase auth
      var user = firebase.auth().currentUser;
      var userId = user.uid;
      //creating a variable docRef that is pointing to the document users in firestore
      //firestore uses collections and within collections there are documents and within docuemtns there can be collections, etc
      const docRef = firestore.collection("ilearn").doc("users");

      //setting the field "user" in "users" document to the userID of the user signed in
      docRef.set({
        user: userId
      }).then(function(){
        //checking to see if the docRef was set properly
        console.log("Status saved!");
      }).catch(function(error){
        console.log("Got an error:" + error);
      });

      //getting the user email of the person signed in and displaying it
      if(user !=null){
          var email_id = user.email;
          document.getElementById("user_para").innerHTML = "Welcome " +  email_id;
      }
    } else {
      // No user is signed in.
      //displaying the login page then
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
      document.getElementById("homepage_div").style.display = "none";
      document.getElementById("createuser_div").style.display = "none";
      document.getElementById("class_homepage_div").style.display = "none";
      
    }
  });



function login(){
  //creates variables that gets the value from what was typed into email and password fields
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
   //verifies the login with firebase auth
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error!" +" "+ errorMessage);
      });
    

}
//when create an account is clicked, display the create user screen
function createaccount(){
  document.getElementById("createuser_div").style.display = "block";
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("homepage_div").style.display = "none";
  document.getElementById("class_homepage_div").style.display = "none";



}
//when "Done" is clicked for creating an account this function is called
function createuser(){
  //creates variables that gets the value from what was typed into email and password fields
    var newuserEmail = document.getElementById("new_email_field").value;
    var newuserPass = document.getElementById("new_password_field").value;

    //when done is clicked a new user is created with the variables from above and added to firebase auth
    firebase.auth().createUserWithEmailAndPassword(newuserEmail, newuserPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
//when "Logout" is called this function runs
function logout(){
    firebase.auth().signOut();
    sessionStorage.clear();
    //set the email and password to have nothing in them
    document.getElementById("email_field").value = '';
    document.getElementById("password_field").value ='';
    
}

//when "Class homepage" is clicked this function runs
function homepage(){
      //gets the user ID from the signed on user 
      var user = firebase.auth().currentUser;
      var userId = user.uid;

      //docRef is the variable that will point to the document that we want to get the data from
      //so, if you look in firestore, there is a collection called ilearn, then a document called users... 
      //...and a collection within the document "users" that has the userIDs of the registered users and then within each collection
      //of userIDs there is a lsit of courses for each specific user
      //so BASICALLY, we are getting the userID which will help us point to a specific document that has the courses for that user
      const docRef = firestore.collection("ilearn").doc("users").collection(userId).doc(userId);
     
      //sets the homepage display
      document.getElementById("homepage_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("user_div").style.display = "none";
      //document.getElementById("class_homepage_div").style.display = "none";

      //this is where we are getting the courses from the document that has the title of the user' signed in's userid.
      //so if i was a user signed in and my user id was 1234, then this would navigate to the collection titled 1234 and then the document
      //titled 1234 and then my courses would be in there, so this get() function is getting the courses from the doc and displaying them
      docRef.get().then(function(doc){
        if(doc && doc.exists){
          const myData = doc.data();
          document.getElementById("homepage_para").innerHTML = "Here are your courses: ";

          document.getElementById("link1").innerHTML = myData.Course1;
          document.getElementById("link1").setAttribute("href",myData.Link1);
          document.getElementById("link2").setAttribute("href",myData.Link2);
          document.getElementById("link2").innerHTML = myData.Course2;
          document.getElementById("link3").setAttribute("href",myData.Link3);
          document.getElementById("link3").innerHTML = myData.Course3;
          document.getElementById("link4").setAttribute("href",myData.Link4);
          document.getElementById("link4").innerHTML = myData.Course4;
          document.getElementById("link5").setAttribute("href",myData.Link5);
          document.getElementById("link5").innerHTML = myData.Course5; 
          
        }
        
      }).catch(function(error){
        console.log("Got an error:" + error);
      });
    }

function americanhistory(){
  document.getElementById("class_homepage_div").innerHTML = "You are logged out!";
}



