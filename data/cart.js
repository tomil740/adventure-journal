import { getProductById } from "./products.js";
import { getDeliveryOptionById } from "./deliveryOptions.js";


export let 
cart = JSON.parse(localStorage.getItem('cart'));
//localStorage.clear();

if(!cart){
    cart = [
    ];
}

function updateCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function getCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
    });
  
    return cartQuantity;
  }

export function addToCart(productId){
    let isFound = false;
      cart.forEach((item) => {
        if(item.productId == productId){
          item.quantity+=1;
          isFound = true;
        }
      })
      if(!isFound){
        cart.push({
          productId:productId,
          quantity:1,
          deliveryOptionId:1
        });
      };  

      updateCart()
}

export function removeCartItem(itemId){
    let newCart = [];
    cart.forEach((item) => {
        if(item.productId != itemId){
          newCart.push({
            item
          });
        }
    });
    cart = newCart;
    updateCart();
}

export function updateItemDeliveryOption(itemId,optionId){
  cart.forEach((item) => {
    if(item.productId === itemId){
      item.deliveryOptionId = optionId; 
      updateCart();
    }
  });
}

export function getCartCosts(){
  let products = 0;
  let deliveries = 0;
  let totalItems = 0;
  cart.forEach((item) =>{
    const product = getProductById(item.productId);
    const deliveryItem = getDeliveryOptionById(item.deliveryOptionId);
    products+=(product.priceCents)*(item.quantity);
    deliveries+=deliveryItem.price;
    totalItems+=item.quantity;
  });

  console.log({
    productsSum:products,
    deliveriesSum:deliveries,
    items:totalItems
  }
  );

  return {
    productsSum:products,
    deliveriesSum:deliveries,
    items:totalItems
  }
}
