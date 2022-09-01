let objectProduct = {}


function showProductsList(object){
    let htmlContentToAppend = "";


    for(let i of object.products){ 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + i.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ i.name +`</h4> 
                        <p> `+ i.description +`</p> 
                        </div>
                        <small class="text-muted">` + i.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            objectProduct = resultObj.data;
            showProductsList(objectProduct);

            //se agrega el nombre de la categoria a la pagina.
            localStorage.setItem('catName', objectProduct.catName);
            let catName = document.getElementById('catProd');
            catName.innerHTML += `<strong>${localStorage.getItem('catName')}</strong>`
        }
    });
});