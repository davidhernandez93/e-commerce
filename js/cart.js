const cartUser = '25801.json';
let tBody = document.getElementById('tableBody');
let cartContent = [];
fetch(CART_INFO_URL + cartUser).then(response => response.json()).then(data => {

    cartContent = data.articles[0];
    // console.log(cartContent);
    showCartContent();

});

function showCartContent(){

    let tRow = document.createElement('tr');
    tRow.innerHTML=`
    <td class='align-middle'><img src='${cartContent.image}' width='75' class="img-fluid"></td>
    <td class='align-middle'>${cartContent.name}</td>
    <td class='align-middle'>${cartContent.currency + ' ' + cartContent.unitCost}</td>
    <td class='align-middle'>
    <input id='itemCount' class='form-control' type='number' min='1' value="${cartContent.count}">
    </td>
    <td id='subtotal' class='align-middle'>${cartContent.currency + ' ' + (cartContent.unitCost*cartContent.count)}</td>
    `
    tBody.appendChild(tRow);
    change();
}

function calSubtotal (){

    return `${cartContent.currency + ' ' + (itemCount.value * cartContent.unitCost)}`

}
function change(){
    itemCount.addEventListener('input', function(){
        subtotal.innerHTML=`${calSubtotal()}`
    })
}
