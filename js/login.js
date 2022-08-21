document.addEventListener('DOMContentLoaded', function(){

    let loginOverlay = document.getElementById('overlay');
    let loginBox = document.getElementById('loginBox');
    let mailInput = document.getElementById('mailInput');
    let pwInput = document.getElementById('pwInput');
    

    //agrega la class hidden con display:none!important al contenedor con el login.
    // no funciona con el evento submit.
    let submitButton = document.getElementById('cerrarLogin');
    submitButton.addEventListener('click', function(event){
        if(mailInput.value !='' && pwInput.value !=''){

            loginOverlay.classList.add('hidden');
            loginBox.classList.add('hidden');
            event.preventDefault();
        }
        
    })

})
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  loginOverlay.classList.add('hidden');
  loginBox.classList.add('hidden');
  }
  window.onload = function () {
  google.accounts.id.initialize({
      client_id: "1016176098528-uovvr0nc8eomedroqi0cqo21niinrh11.apps.googleusercontent.com",
      callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
  loginOverlay.classList.add('hidden');
  loginBox.classList.add('hidden');
}
