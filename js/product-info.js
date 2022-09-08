let productInfo = {}
let products = [];
let productImages = [];
let productComments = [];

function showProductInfo(){

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <h2>${productInfo.name}</h2>
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
        <div>
            <img src="` + image + `" alt="product image" class="img-thumbnail">
        </div>
        `
        
        document.getElementById("prod-images-container").innerHTML += imagesToAppend;

    }
    
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

    //define cuantas estrellas vacias van a quedar.   
    let blankStars = (5 - score);
    let voidStar = `<i class="rating__star far fa-star"></i>`.repeat(blankStars);
    //define cuantas estrellas tiene de puntaje
    let fullStar = `<i class="rating__star fas fa-star"></i>`.repeat(score);
    //se muestran las estrellas vacias y rellenas concatenadas
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
            showProductInfo(productInfo);
            showProductImages(productImages);
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

//desafiate

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
    
    newComment ='';
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


