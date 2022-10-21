let productInfo = {}
let products = [];
let productImages = [];
let productComments = [];
let productRelated = [];

function showProductInfo(){

    document.getElementById('prodName').innerHTML = `${productInfo.name}`;

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <hr>
    <p><strong>Precio</strong></p>
    <p>${productInfo.cost}</p>
    <p><strong>Descripción</strong></p>
    <p>${productInfo.description}</p>
    <p><strong>Categoría</strong></p>
    <p>${productInfo.category}</p>
    <p><strong>Cantidad de vendidos</strong></p>
    <p>${productInfo.soldCount}</p>
    <p><strong>Imágenes ilustrativas</strong></p>
    
    `
    document.getElementById("prod-list-container").innerHTML += htmlContentToAppend;
}


function showProductImages(){

    let imagesToAppend = '';

    for (let image of productImages){

        imagesToAppend = `
        <div class='carousel-item'>
            <img src="` + image + `" alt="product image" class="img-thumbnail d-block w-100">
        </div>
        `
        
        document.getElementById("prod-images-container").innerHTML += imagesToAppend;

    }
    let firstItem = document.getElementsByClassName('carousel-item')[0];
    firstItem.classList.add(`active`);
}

function showProductComments(){
    let commentToAppend = '';
    for(let data of productComments){

        commentToAppend += `
        <div id="divComments" class="list-group-item">

            <strong>${data.user}</strong>
            -
            ${data.dateTime}
            -
            <span id='rating'>${rating(data.score)}</span>
            </br>
            ${data.description}
            
        </div>
        `
    }
    document.getElementById("prod-comments-container").innerHTML += commentToAppend;

};

function rating(score){

    let blankStars = (5 - score);
    let voidStar = `<i class="rating__star far fa-star"></i>`.repeat(blankStars);
    let fullStar = `<i class="rating__star fas fa-star"></i>`.repeat(score);
    return fullStar + voidStar;    

}

document.addEventListener("DOMContentLoaded", function(e){
    
    //fetch a los objetos con la informacion del producto y al array con las imagenes.
    //Se invocan las funciones para mostrarlas en el html
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;
            productImages = productInfo.images;
            productRelated = productInfo.relatedProducts;
            showProductInfo();
            showProductImages();
            showRelated();
            buy()
        }
    });
    //fetch a los objetos con los comentarios de los productos.
    //Se invocan las funciones para mostrarlas en el html
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(object){
        if (object.status === "ok")
        {
            productComments = object.data;
            showProductComments(productComments);
        }
    });
    

});

function setRelId(id){
    localStorage.setItem('prodId', id);
    window.location ='product-info.html';
}

function showRelated(){
    let productToAppend = '';

    for (let product of productRelated){

        productToAppend += `
        <div onclick="setRelId(${product.id})" class="img-thumbnail">
            <img src="${product.image}" alt="product image" class='w-100'>
            <p>${product.name}</p>
        </div>
        `
        
        
    }
    
    document.getElementById('prodRelated-list-container').innerHTML += productToAppend;

}


//desafiate Entrega 3

let form = document.getElementById('form');
let formBtn = document.getElementById('formBtn')
let formCommentBox = document.getElementById('comment');
let formScore = document.getElementById('score');
let nombre = localStorage.getItem('nombre');
let commentOfUser = JSON.parse(localStorage.getItem("listOfComments"));
let newComment ='';

if (commentOfUser === null) {
    commentOfUser = [] 
};

function saveCommentOfUser (){

    let formSubmitted = {user: nombre, score: formScore.value, description: formCommentBox.value};
    localStorage.setItem("form", JSON.stringify(formSubmitted));
    commentOfUser.push(formSubmitted);
    localStorage.setItem('listOfComments', JSON.stringify(commentOfUser));
    console.log(localStorage.getItem('form'));
    console.log(localStorage.getItem('listOfComments'))
    
}

function showCommentOfUser(){
    
    let newComment ='';
    for(let item of commentOfUser){

        newComment = `
        <div id="divComments" class="list-group-item">
            <strong>${item.user}</strong>
            -
            <span id='rating'>${rating(item.score)}</span>
            </br>
            ${item.description}
        </div>
        `
        formCommentBox.value = '';

    }
        
    document.getElementById("prod-comments-container").innerHTML += newComment;

}
formBtn.addEventListener('click', function(e){
    e.preventDefault();
    saveCommentOfUser();
    showCommentOfUser();
})


//Fin desafiate entrega 3

let btnBuy = document.createElement('button');
btnBuy.innerHTML = 'Comprar';
btnBuy.setAttribute('class', 'btn btn-success btn-lg');
btnBuy.setAttribute('id', 'buyBtn');
document.getElementById('btnDiv').appendChild(btnBuy);

function buy(){
    let buttonBuy = document.getElementById('buyBtn');
    buttonBuy.addEventListener('click', function(){
        if(!isInCart()){
            saveitemsInCart();
        }else{
            buttonBuy.setAttribute(`class`, `btn btn-danger`);
            buttonBuy.innerHTML=`En el carrito`;
        }
    })
}


let itemsInCart = JSON.parse(localStorage.getItem("listOfItems"));
if (itemsInCart === null) {
    itemsInCart = [] 
};
function saveitemsInCart (){

    let objectItem = {
        id: productInfo.id,
        count: 1,
        name: productInfo.name,
        unitCost: productInfo.cost,
        currency: productInfo.currency,
        image: productInfo.images[0],
    }
    itemsInCart.push(objectItem);
    localStorage.setItem('listOfItems', JSON.stringify(itemsInCart));
    
}

let prodId = Number(localStorage.getItem('prodId'));
console.log(prodId)

function isInCart() {
    for (let item of itemsInCart) {
        console.log(item);
      if (item.id == localStorage.getItem('prodId')) {
        return true;
      }
    }
    return false;
}
isInCart();