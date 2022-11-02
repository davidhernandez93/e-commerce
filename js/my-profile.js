// Declaracion de variables.
let formProfile = document.getElementById('formProfile');
let mail = document.getElementById('mail');
let mailFailure = document.getElementById('mailFailure');
let firstName = document.getElementById('firstName');
let secondName = document.getElementById('secondName');
let firstLastName = document.getElementById('firstLastName');
let secondLastName = document.getElementById('secondLastName');
let contactPhone = document.getElementById('contactPhone');

// muestra el mail del login.
mail.value = localStorage.getItem('email')


// Validacion al submitear el form
formProfile.addEventListener('submit', function (event) {
    
    
    if (!formProfile.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    if(!mail.value.includes('@')){
        event.preventDefault();
        mail.setCustomValidity('');
        mailFailure.innerHTML = 'Debe ingresar un mail valido';
    }
    formProfile.classList.add('was-validated');
    if(formProfile.checkValidity()){
        setProfileInfo();
        console.log(localStorage.getItem('profileInfo'));
    }
})

//mejora de visualizacion de numbero de telefono
contactPhone.addEventListener('input', function(e){
    if(e.target.value.length == 3){
        e.target.value += ' ';
    }
    if(e.target.value.length == 7){
        e.target.value += ' ';
    }
})


// Guardado de datos en localStorage

function setProfileInfo(){
    
    let profileInfo = {
        stName : firstName.value,
        ndName : secondName.value,
        stLastName : firstLastName.value,
        ndLastName : secondLastName.value,
        newMail : mail.value,
        phone : contactPhone.value
    };
    localStorage.setItem('email', profileInfo.newMail);
    localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
}

// Seteado de informacion guardada en localStorage en el form
document.addEventListener('DOMContentLoaded', function(){
    function showProfileInfo(){
        let infoStored = JSON.parse(localStorage.getItem('profileInfo'));
        if(infoStored.stName != undefined){
            firstName.value = infoStored.stName;
        }else{firstName.value = ''};

        if(infoStored.ndName != undefined){
            secondName.value = infoStored.ndName;
        }else{secondName.value = ''};

        if(infoStored.stLastName != undefined){
            firstLastName.value = infoStored.stLastName;
        }else{firstLastName.value = ''};

        if(infoStored.ndLastName != undefined){
            secondLastName.value = infoStored.ndLastName;
        }else{ndLastName.value = ''};

        if(infoStored.phone != undefined){
            contactPhone.value = infoStored.phone;
        }else{contactPhone.value = ''};

    }
    showProfileInfo();
})
