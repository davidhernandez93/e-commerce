const cartUser = '25801.json';
let cartContent = [];
let itemsInCart = JSON.parse(localStorage.getItem("listOfItems"));
let subTotal = 0;

if(itemsInCart === null){
    itemsInCart = [];
};

fetch(CART_INFO_URL + cartUser).then(response => response.json()).then(data => {

    cartContent = data.articles;
    cartContent = cartContent.concat(itemsInCart);
    showCartContent();
    showSubtotal();
    addDelete();

});

function showCartContent(){
    for(let item of cartContent){
        let tRow = document.createElement('tr');
        tRow.setAttribute(`class`, `tRow`);
        tRow.innerHTML =`
            <td><image src='${item.image}' width='75' class='img-fluid'></td>
            <td>${item.name}</td>
            <td>${conversion(item.currency, item.unitCost)}</td>
            <td id='count-${item.id}'></td>
            <td><span class='subSpan' id='sub-${item.id}'>${conversion(item.currency, item.unitCost)}</span></td>
            `
        document.getElementById('tableBody').appendChild(tRow);
        
        let inputCount = document.createElement('input');
        inputCount.setAttribute(`class`, `form-control`);
        inputCount.setAttribute(`type`, `number`);
        inputCount.setAttribute(`min`, `1`);
        inputCount.setAttribute(`value`, item.count);
        
        inputCount.addEventListener('input', function(){
            document.getElementById('sub-'+item.id).innerHTML = calcSubtotal(item.currency, item.unitCost, inputCount.value);
            
        })
        document.getElementById(`count-${item.id}`).appendChild(inputCount);

    }
    
}

function addDelete(){

    let row = document.getElementsByClassName('tRow');
    for(let i = 0; i<row.length; i++){
        let tdDelete = document.createElement('td');
        tdDelete.setAttribute(`class`, `text-center`)
        let btnDelete = document.createElement('button');
        btnDelete.setAttribute(`class`,`btn btn-danger`)
        btnDelete.innerHTML=`
            <i class="fa fa-trash" aria-hidden="true"></i>
        `;
        btnDelete.addEventListener('click', function(){
            console.log(itemsInCart);
            // delete itemsInCart[0];
            // this.parentElement.parentElement.remove()
        })
        tdDelete.appendChild(btnDelete);

        row[i].append(tdDelete)
    }
}

function conversion (currency, cost){
    if(currency==='UYU'){
        currency='USD';
        cost = Math.round(cost / 40);
    }
    
    return currency +' '+ cost
}
    
function calcSubtotal(currency, cost, input){
    if(currency==='UYU'){
        currency = 'USD';
        cost = Math.round(cost / 40);
    }
    return currency + ' ' + cost * input;

}

function showSubtotal(){
    for(let i = 0; i<cartContent.length; i++){
        if(cartContent[i].currency==='UYU'){
            cartContent[i].unitCost = cartContent[i].unitCost / 40;
        }
        subTotal += Math.round(cartContent[i].unitCost);
    }
    let divSubtotal = document.getElementById('divSubtotal');
    divSubtotal.innerHTML = `<strong>Total de la compra: USD ${subTotal}</strong>`;
}