document.addEventListener('DOMContentLoaded', function(){


    let mailInput = document.getElementById('mailInput');
    let pwInput = document.getElementById('pwInput');
    let submitButton = document.getElementById('cerrarLogin');

    submitButton.addEventListener('click', function(event){
        if(mailInput.value !='' && pwInput.value !=''){

            localStorage.setItem('nombre', mailInput.value);
            nombreLogin = localStorage.getItem('nombre');
            location.replace('index.html');
            event.preventDefault();

        }
        
    })

})
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  location.replace('home.html');
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
}
