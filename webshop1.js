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
}