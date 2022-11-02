    const cartUser = '25801.json';
let cartContent = [];
let itemsInCart = JSON.parse(localStorage.getItem("listOfItems"));
let percentage = 0;
let id;

if(itemsInCart === null){
    itemsInCart = [];
};

fetch(CART_INFO_URL + cartUser).then(response => response.json()).then(data => {
    cartContent = data.articles;
    cartContent = cartContent.concat(itemsInCart);
    showCartContent();
    showCosts();
    selectedRate();
});

function showCartContent(){
    for(let item of cartContent){
        let tRow = document.createElement('tr');
        tRow.setAttribute(`class`, `tRow`);
        tRow.innerHTML =`
            <td><image src='${item.image}' width='75' class='img-fluid'></td>
            <td>${item.name}</td>
            <td class='unitCost'>USD ${conversion(item.currency, item.unitCost)}</td>
            <td class='unitQuantity' id='count-${item.id}'></td>
            <td><span class='subSpan' id='sub-${item.id}'>USD ${conversion(item.currency, item.unitCost)}</span></td>
            `
        document.getElementById('tableBody').appendChild(tRow);
        let inputCount = document.createElement('input');
        inputCount.setAttribute(`class`, `form-control inputQuantity`);
        inputCount.setAttribute(`type`, `number`);
        inputCount.setAttribute(`min`, `1`);
        inputCount.setAttribute(`value`, item.count);
        
        inputCount.addEventListener('input', function(){
            if(inputCount.value<0){
                inputCount.value = 1;
            }
            document.getElementById('sub-'+item.id).innerHTML = 'USD ' + calcSubtotal(item.currency, item.unitCost, inputCount.value);
            showCosts()
        })
        document.getElementById(`count-${item.id}`).appendChild(inputCount);


        let tdDelete = document.createElement('td');
        tdDelete.setAttribute(`class`, `text-center`)
        let btnDelete = document.createElement('button');
        btnDelete.setAttribute(`class`,`btn btn-danger`)
        btnDelete.innerHTML=`
            <i class="fa fa-trash" aria-hidden="true"></i>
        `;

        btnDelete.addEventListener('click', function(){
            let itemIndex = cartContent.indexOf(item);
            cartContent.splice(itemIndex, 1);
            localStorage.setItem("listOfItems", JSON.stringify(cartContent));
            console.log(cartContent);
            this.parentElement.parentElement.remove();
            showCosts();

        })
        tdDelete.appendChild(btnDelete);
        tRow.appendChild(tdDelete);

    }
    
}

function conversion (currency, cost){
    if(currency==='UYU'){
        currency='USD';
        cost = Math.round(cost / 40);
    }
    let unitCost = Math.round(cost);    
    return unitCost;
}
    
function calcSubtotal(currency, cost, input){
    if(currency==='UYU'){
        currency = 'USD';
        cost = Math.round(cost / 40);
    }
    let prodSubtotal = Math.round(cost * input) ;
    return prodSubtotal;
}

function showCosts(){
    let itemRows = document.getElementsByClassName('tRow');
    let subTotal = 0;
    for(let i = 0; i<itemRows.length; i++){
        let itemRow = itemRows[i];
        let price = parseFloat(itemRow.getElementsByClassName('unitCost')[0].innerText.replace('USD ', ''));
        let quantity = parseFloat(itemRow.getElementsByClassName('inputQuantity')[0].value);
        subTotal += parseInt(price * quantity);
    }
    let divSubtotal = document.getElementById('divSubtotal');
    divSubtotal.innerHTML = `<strong>Total de la compra: USD ${subTotal}</strong>`;
    
    let costSubtotal = document.getElementById('productCostText');
    costSubtotal.dataset.sub = Number(subTotal);
    costSubtotal.innerHTML = `USD ${costSubtotal.dataset.sub}`;

    let costPercentage = document.getElementById('percentageText');
    costPercentage.dataset.percentage = parseInt(Number(subTotal * percentage));
    costPercentage.innerHTML = `USD ${costPercentage.dataset.percentage}`

    let totalCostHTML = document.getElementById('totalCostText');
    let totalCost = parseInt((Number(costSubtotal.dataset.sub) + Number(costPercentage.dataset.percentage)));
    totalCostHTML.innerHTML = `USD ${totalCost}`;
}

let premiumRate = document.getElementById('radio1');
let expressRate = document.getElementById('radio2');
let standardRate = document.getElementById('radio3');
let rateSelected = false;

function selectedRate (){  
    premiumRate.addEventListener('change', function(){
        percentage = 0.15;
        showCosts()
    });
    expressRate.addEventListener('change', function(){
        percentage = 0.07;
        showCosts()
    });
    standardRate.addEventListener('change', function(){
        percentage = 0.05;
        showCosts()
    });
}

function addDelete(){
    
}
function openModal(){
    document.getElementById('modalLink').addEventListener('click', function(){
        document.getElementById('modalBox').classList.remove('hidden');
        document.getElementById('overlay').classList.remove('hidden');
    })
}
openModal();

function addHidden(){
    document.getElementById('modalBox').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}

function closeModal(){
    document.querySelector('.close-modal').addEventListener('click', function(){
        addHidden();
    })
    document.querySelector('.overlay').addEventListener('click', function(){
        addHidden();
    })
    document.addEventListener('keyup', function(e){
        if(e.key==='Escape' && !document.getElementById('modalBox').classList.contains('hidden')){
            addHidden();
        }
    })
}
closeModal();

let btnPurchase = document.getElementById('btnPurchase');
let street = document.getElementById('inputStreet');
let number = document.getElementById('inputNumber');
let corner = document.getElementById('inputCorner');
let credit = document.getElementById('creditCard');
let bankWire = document.getElementById('bankWire');
let notEmpty = false;
let checked = false;

btnPurchase.addEventListener('click', function(e){
    e.preventDefault();
    isEmpty(street);
    isEmpty(number);
    isEmpty(corner);
    notChecked(credit, bankWire);
    if(street.value !=='' && number.value !=='' && corner.value !==''){
        notEmpty = true;
    }
    if(premiumRate.checked || expressRate.checked || standardRate.checked){
        rateSelected = true;
        document.getElementById('shippingNotSelected').classList.add('hidden');

    }
    if(!premiumRate.checked && !expressRate.checked && !standardRate.checked){
        document.getElementById('shippingNotSelected').classList.remove('hidden');
    }
    if(notEmpty && checked && rateSelected){
        document.getElementById('success').classList.remove('hidden');
    }
    
})


function isEmpty(input){
    if(!input.value && input.id ==='inputStreet'){
        document.getElementById('pStreet').classList.remove('hidden');
        street.style.borderColor = 'red';
    }else if(input.value && input.id ==='inputStreet'){
        street.style.borderColor = '#ced4da';
        document.getElementById('pStreet').classList.add('hidden');
    }
    if(!input.value && input.id ==='inputNumber'){
        document.getElementById('pNumber').classList.remove('hidden');
        number.style.borderColor = 'red';
    }else if(input.value && input.id ==='inputNumber'){
        number.style.borderColor = '#ced4da';
        document.getElementById('pNumber').classList.add('hidden');
    }
    if(!input.value && input.id ==='inputCorner'){
        document.getElementById('pCorner').classList.remove('hidden');
        corner.style.borderColor = 'red';
    }else if(input.value && input.id ==='inputCorner'){
        corner.style.borderColor = '#ced4da';
        document.getElementById('pCorner').classList.add('hidden');
    }
}


function notChecked (option1, option2){
    if(!option1.checked && !option2.checked){
        document.getElementById('spanMissing').innerText = 'No se ha seleccionado una forma de pago'
        document.getElementById('spanMissing').style.color = 'red';
    }
    else{
        document.getElementById('spanMissing').style.color = '#212529';
    }
    if(option1.checked){
        document.getElementById('spanMissing').innerText = `Tarjeta de crédito`;
    }
    if(option2.checked){
        document.getElementById('spanMissing').innerText = `Transferencia bancaria`;
    }
    if(option1.checked && (!document.getElementById('cardNumber').value || !document.getElementById('cardCode').value || !document.getElementById('cardDue').value)){
        document.getElementById('spanMissing').innerText = 'Faltan completar datos'
        document.getElementById('spanMissing').style.color = 'red';
        checked = false;
    }
    if(option2.checked && !document.getElementById('bankAccount').value){
        document.getElementById('spanMissing').innerText = 'Faltan completar datos'
        document.getElementById('spanMissing').style.color = 'red';
        checked = false;
    }
    if(option1.checked && document.getElementById('cardNumber').value && document.getElementById('cardCode').value && document.getElementById('cardDue').value){
        checked = true;
    }
    if(option2.checked && document.getElementById('bankAccount').value){
        checked = true;
    }

}

function selectPayment(option1, option2, text){
    document.getElementById('bankAccount').disabled = option1;
    document.getElementById('cardNumber').disabled = option2;
    document.getElementById('cardCode').disabled = option2;
    document.getElementById('cardDue').disabled = option2;
    document.getElementById('spanMissing').innerText = text;
    document.getElementById('spanMissing').style.color = '#212529';
}
credit.addEventListener('change', function(){
    selectPayment(true, false, 'Tarjeta de Crédito');
});
bankWire.addEventListener('change', function(){
    selectPayment(false, true, 'Transferencia bancaria');
});
