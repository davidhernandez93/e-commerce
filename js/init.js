const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
let PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prodId')}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('prodId')}.json`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


var userName = [];
var nombreUserNavBar = '';


//Valida si el hay en el localStorage hay un objeto con el nombre de usuario. Si no lo hay redirige a la pagina de login.
function validarUserLogeado(){

  userName = localStorage.getItem('email');
  if(userName === null){
  
    location.replace('login.html');
    userName = localStorage.setItem('email', mailInput.value);
  
  }

}
validarUserLogeado();


//setea el nombre del usuario guardado en localStorage en el NavBar de todas las paginas.
function nombreNavBar(){

  nombreUserNavBar = document.getElementById("nombreUser");
  nombreUser.innerText = localStorage.getItem('email');

}
nombreNavBar();


function cerrarSesion (){

  localStorage.setItem('email', '');
  location.replace('login.html');

}

document.getElementById('signOut').addEventListener('click', function(){

  cerrarSesion();

})


let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}