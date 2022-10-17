const cartUser = '25801.json';
let cartContent = [];
let itemsInCart = JSON.parse(localStorage.getItem("listOfItems"));

if(itemsInCart === null){
    itemsInCart = [];
};

fetch(CART_INFO_URL + cartUser).then(response => response.json()).then(data => {

    cartContent = data.articles;
    cartContent = cartContent.concat(itemsInCart);
    
    showCartContent();

});

function showCartContent(){

    for(let item of cartContent){

        let tRow = document.createElement('tr');
        tRow.innerHTML =`
            <td><image src='${item.image}' width='75' class='img-fluid'></td>
            <td>${item.name}</td>
            <td>${item.currency} ${item.unitCost}</td>
            <td id='count-${item.id}'></td>
            <td><span id='sub-${item.id}'> ${item.currency} ${item.unitCost}</span></td>
            `
        document.getElementById('tableBody').appendChild(tRow);
        
        let inputCount = document.createElement('input');
        inputCount.setAttribute(`class`, `form-control`);
        inputCount.setAttribute(`type`, `number`);
        inputCount.setAttribute(`min`, `1`);
        inputCount.setAttribute(`value`, item.count);
        
        inputCount.addEventListener('input', function(){
            document.getElementById('sub-'+item.id).innerHTML = item.currency + ' ' + (item.unitCost * inputCount.value);
            
        })
        document.getElementById(`count-${item.id}`).appendChild(inputCount);
        }
    }

