window.onload = function(){
    const cartIcon = document.querySelector('.kosarikon');
    const cartCloseBtn = document.querySelector('.fa-close');
    const cartBox = document.querySelector('.cartBox');

    cartIcon.addEventListener('click', function(){
        cartBox.classList.add('active');
    });

    cartCloseBtn.addEventListener('click', function(){
        cartBox.classList.remove('active');
    });

    const addToCartBtns = document.getElementsByClassName('kosarhoz');

    let cartItems = [];

    for (let i = 0; i< addToCartBtns.length; i++) {
      addToCartBtns[i].addEventListener('click', function(e){
        if (typeof(Storage) !== 'undefined'){
            let item = {
                id: i+1,
                name: e.target.parentElement.children[0].innerHTML,
                price: parseInt(e.target.parentElement.children[1].innerHTML),
                quantity: parseInt(e.target.parentElement.children[2].value)
            }
            console.log(item);

            if(JSON.parse(localStorage.getItem('cartItems')) === null){
                cartItems.push(item);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                window.location.reload();
            }
            else{
                const storedItems = JSON.parse(localStorage.getItem('cartItems'));
                storedItems.map(data=>{
                    if(item.id == data.id){
                        item.quantity += data.quantity;
                    }
                    else{
                        cartItems.push(data);
                    }
                })
                cartItems.push(item);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                window.location.reload();
            }
        }
        else{
            alert('LocalStorage is not supported');
        }
      });
    }

const cartIconCounter = document.querySelector('.kosarikon p');
let totalQuantity = 0;
JSON.parse(localStorage.getItem('cartItems')).map(data=>{
    totalQuantity += data.quantity;
})
    cartIconCounter.innerHTML = totalQuantity;

    const cartBoxTable = document.querySelector('table');
    let tableData = '';
    tableData += '    <tr><th>Termék ID</th><th>Termék Név</th><th>Termék Mennyiség</th><th>Termék Ár</th><th></th><th></th></tr>';

    if(JSON.parse(localStorage.getItem('cartItems'))[0] === null){
        tableData += '<tr><td colspan="5"></td></tr>';
    }else{
        JSON.parse(localStorage.getItem('cartItems')).map(data=>{
            let totalPrice = data.price * data.quantity;
            tableData += '<tr><th>' + data.id + '</th><th>' + data.name + '</th><th>' + data.quantity + '</th><th>' + data.price * data.quantity + '</th></tr>';
        })
    }



    cartBoxTable .innerHTML = tableData;
}