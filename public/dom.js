const prueba2 =()=>{
    let textEmail= document.getElementById("email").value;
    let textPassword = document.getElementById("password").value;
    window.main.checkIn(textEmail, textPassword);
}
const btncheckIn= document.getElementById("buttonCheckIn");
btncheckIn.addEventListener("click", prueba2 );

function prueba() {
    let textEmail1 = document.getElementById("email").value;
    let textPassword1 = document.getElementById("password").value;
    window.main.singIn(textEmail1, textPassword1);

}
const btnSingInok=document.getElementById("buttonSingIn");
btnSingInok.addEventListener("click", prueba );
    
function observer() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        document.getElementById("screen2").style.display = "block"
        document.getElementById("screen1").style.display = "none"
        console.log("existe usuario");
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
       
      } else {
        console.log ("no existe usuario");
      }
    });
  }
  observer();

  function close() {
    window.main.closeSession();
  }
const btnClose= document.getElementById("close");
btnClose.addEventListener("click", close);

function googlebtn(){
    window.main.googleSingIn();
}
    const btnGoogle = document.getElementById("google");
 btnGoogle.addEventListener("click", googlebtn);

 //esta funcion guarda los datos automaticamente//

  function guardar (){
    firebase.database().ref("usuariosGoogle").set({
      nombre:"BlisS",
      edad:"15",
      sexo:"x"
    })
  }
