let objectCars = {}

function showCarsList(object){
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
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            objectCars = resultObj.data;
            showCarsList(objectCars);
        }
    });
});