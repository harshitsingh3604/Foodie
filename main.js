var swiper = new Swiper(".mySwiper", {
    loop : true,
    navigation: {
      nextEl: "#next",
      prevEl: "#prev",
    },
  });


  const cartIcon = document.querySelector('.cart-icon');
  const cartTab = document.querySelector('.cart-tab');
  const closeBtn = document.querySelector('.close-btn'); 
  const cardList = document.querySelector('.card-list'); 
  const cartList = document.querySelector('.cart-list'); 
  const cartTotal = document.querySelector('.cart-total'); 
  const cartValue = document.querySelector('.cart-value'); 
  const mobileMenu = document.querySelector('.mobile-menu'); 
  const bars = document.querySelector('.fa-bars');
  const hamburger = document.querySelector('.hamburger');
  


  cartIcon.addEventListener('click' , () => cartTab.classList.add('cart-tab-active') );
  closeBtn.addEventListener('click' , () => cartTab.classList.remove('cart-tab-active') );
  hamburger.addEventListener('click' , () => mobileMenu.classList.toggle('mobile-menu-active'));
  hamburger.addEventListener('click' , () => bars.classList.toggle('fa-xmark'));


  let productList = [];
  let cardProduct = [];

  const updateTotal = () => {
    let tottalPrice = 0;
    let totalQuantity = 0;
    document.querySelectorAll('.item').forEach(item =>{

        
        const quantity =parseInt(item.querySelector('.quantity-value').textContent);
        const price =parseFloat(item.querySelector('.item-total').textContent.replace('₹',''));

        tottalPrice += price;
        totalQuantity += quantity;
    });

    cartTotal.textContent = `₹${tottalPrice.toFixed(2)}`;
    cartValue.textContent = totalQuantity;
  }

  const showCard = () =>{
    productList.forEach(product => {

        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
        <div class="card-image">
            <img src="${product.image}" alt="">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">₹${product.price}</h4>
        <a href="#" class="btn card-btn">Add to Cart</a>
        `;

        cardList.appendChild(orderCard);

        const cardBtn = orderCard.querySelector('.card-btn');
        cardBtn.addEventListener('click' , (e) => {
            e.preventDefault();
            addToCard(product);
        });
    });
  };

const addToCard = (product)=>{

    const existingProduct = cardProduct.find(item => item.id === product.id);
    if(existingProduct){
        alert('Item already in cart');
        return;
    }

    cardProduct.push(product);

    let quantity = 1;
    let price = parseFloat(product.price.replace('₹','') )

    const cardItem = document.createElement('div');
    cardItem.classList.add('item');

    cardItem.innerHTML = `
        <div class="item-image">
            <img src="${product.image}" alt="">
        </div>
        <div class = "detail">
            <h4>${product.name}</h4>                   
            <h4 class="item-total"> ₹${product.price}</h4>
        </div>
        <div class="flex">
            <a href="#" class="quantity-btn minus">
                <i class="fa-solid fa-minus"></i>
            </a>
            <h4 class="quantity-value">${quantity}</h4>
            <a href="#" class="quantity-btn plus">
                <i class="fa-solid fa-plus"></i>
            </a>
        </div>                  
    `;

    cartList.appendChild(cardItem);
    updateTotal();
 
    const plusBtn = cardItem.querySelector('.plus');
    const quantityValue = cardItem.querySelector('.quantity-value');
    const itemTotal = cardItem.querySelector('.item-total');
    const minusBtn = cardItem.querySelector('.minus');


    plusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        quantity = quantity + 1;
        quantityValue.textContent = quantity;
        itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
        updateTotal();
    })

    minusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(quantity>1){
            quantity = quantity - 1;
            quantityValue.textContent = quantity;
            itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
            updateTotal();
        }
        else{
            cardItem.classList.add('slide-out');

            setTimeout(()=>{
                cardItem.remove();
                cardProduct = cardProduct.filter(item => item.id !== product.id);
                updateTotal();
            },300);
        }
        
    })


}

  
  const initApp = () => {
    fetch('products.json').then(
        response => response.json()
    ).then(
        data => {
            productList = data;
            showCard();
        }
    )
  }


  initApp();
