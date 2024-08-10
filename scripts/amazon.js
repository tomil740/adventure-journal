import {products} from '../data/products.js';
import {cart,getCartQuantity,addToCart} from '../data/cart.js';
//view genarting secktion :
/*
Take the current products data and genrate accordingly the UI element in HTML
*/
let productsHtml= '';

products.forEach((product)=>{
  productsHtml+= `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars*10)}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}"
          >
            Add to Cart
          </button>
        </div>
    `;    
})
//With querySelector we are pulling the content of the picked HTMLelement into the JS code,by doing so we gain controll over it
document.querySelector('.products-grid').
innerHTML = productsHtml;



//controll secktion:
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click',() => {
    addToCart(button.dataset.productId);
    //this isnt according to the arhitecture,update the UI alone stright from the controll...     
    const cartQuantity = getCartQuantity();
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  })
});



