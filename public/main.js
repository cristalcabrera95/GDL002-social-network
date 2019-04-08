window.main ={
    checkIn:(textEmail, textPassword)=> {
    firebase
      .auth()
      .createUserWithEmailAndPassword(textEmail, textPassword)
      .then(function(){
        verific()
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
      });
  },
  
   singIn:(textEmail1, textPassword1)=> {
    firebase
      .auth()
      .signInWithEmailAndPassword(textEmail1, textPassword1)
      .catch(function(error) {
        document.getElementById("emailOK").innerHTML = error.message;
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
       console.log(errorMessage, errorCode )
      });
    },
    closeSession:()=>{
      firebase.auth().signOut().then(function() {
        location.reload();
        // Sign-out successful.
        console.log("listo");
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    },
    googleSingIn:()=>{
  
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log("ya la hisiste");
      guardaDatos(result.user);  
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    }); 
   
   },
   guardaDatos:(user)=>{
    var usuario={
      uid:user.uid,
      nombre:user.displayName,
      email:user.email,
      foto:user.photoURL
    }
    firebase.database().ref("googleData")
    .push(usuario)
  }
   
   
  }
  
  function verific(){
    
    var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("enviando correo..");
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
  }
  
  
  var db = firebase.firestore();
  //Agregar comentario
  function guardar(){
    console.log("guardar")
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let comentario = document.getElementById('comentario').value;
    console.log(nombre, fecha, comentario)
    db.collection("users").add({
      first: nombre,
      last: fecha,
      born: comentario
      })
      .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      // Refrescar pantalla por medio de strin limpios
        document.getElementById("nombre").value = " ";
        document.getElementById("fecha").value = " ";
        document.getElementById("comentario").value = " ";
      })
      .catch(function(error) {
      console.error("Error adding document: ", error);
      });
  }
  //Leer documentos
  var newPost = document.getElementById('newPost');
  db.collection("users").onSnapshot((querySnapshot) => {
      newPost.innerHTML = '';
      querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data().first}`);//
      newPost.innerHTML += `
      <div id="sub-menu">
    <div id="left-bar">
      <div class="heading">
        Notifications
      </div>
    </div>
    <div id="right-bar">
    
    </div>
  </div>
  <div id="main-window">
    <div class="post">
      <div class="user">
        <div class="user-img"></div>
        <div class="user-info">
          <div class="user-name my-3" >${doc.data().first}</div>
          <span class="post-date my-3">${doc.data().last}</span>
        </div>
        <div class="actions">
          <span class="heart"></span>
          <span class="comment" onclick="eliminar('${doc.id}')"></span>
          <span class="share" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')"></span>
        </div>
      </div>
      <div class="content">
        <div class="user-name">${doc.data().born}</div>
        
      </div>
    </div>
    `
      });
  });
  //borrar documentos
  function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
  //editar documentos
  function editar(id,nombre,fecha,comentario){
      document.getElementById('nombre').value=nombre;
      document.getElementById('fecha').value=fecha;
      document.getElementById('comentario').value=comentario;
      var boton=document.getElementById('boton');
      boton.innerHTML = 'Editar';
      boton.onclick = function(){
      var washingtonRef = db.collection("users").doc(id);   
  var nombre =document.getElementById('nombre').value;
  var fecha=document.getElementById('fecha').value;
  var comentario=document.getElementById('comentario').value;
  return washingtonRef.update({
      first: nombre,
      last: fecha,
      born: comentario
  })
  .then(function() {
      console.log("Document successfully updated!");
      boton.innerHTML = 'guardar';
      document.getElementById('nombre').value = "";
      document.getElementById('fecha').value= "";
      document.getElementById('comentario').value= "";
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  }); 
  }
  }
  
  