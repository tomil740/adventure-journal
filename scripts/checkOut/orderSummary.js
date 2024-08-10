import {cart,removeCartItem,updateItemDeliveryOption} from '../../data/cart.js';
import {getProductById} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryOptions.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrderSummary(){
    let htmlData = ``;
  
    function getDeliveryOptionsUi(productId,cartItemDeleveryPick){
      let deliveryOptionsUi = `
              <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                </div>
      `;
      const today = dayjs();
      deliveryOptions.forEach((option)=>{
        const deliveryDate = today.add(option.deliverDays,'days');
        const dataString= deliveryDate.format('dddd,MMM D');
  
        //we will check whic delviery option to check according to the saved in the item attribute
        const isChecked = cartItemDeleveryPick==option.id;
  
        deliveryOptionsUi+=`
        <div class="delivery-option js-delivery-option"
        data-product-id=${productId} data-delivery-option-id=${option.id}>
          <input type="radio" ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
            <div class="delivery-option-date">
              ${dataString}
            </div>
              <div class="delivery-option-price"> 
                $${(option.price/100).toFixed(2)}
              </div>
            </div>
        </div>
    `
      });
    deliveryOptionsUi+=`</div>`
    return deliveryOptionsUi;
    }
  
    cart.forEach((item)=>{
  
      //get the picked delevery option date(for our header):
      let deleveryHeader = '';
      deliveryOptions.forEach((option)=>{
        if(option.id == item.deliveryOptionId){
          const today = dayjs();
          const deliveryDate = today.add(option.deliverDays,'days');
          const dataString= deliveryDate.format('dddd,MMM D');
          deleveryHeader = deliveryDate;
        }
      });
  
        const productItem = getProductById(item.productId);
        htmlData += `
        <div class="cart-item-container js-item-id-${productItem.id}">
                <div class="delivery-date">
                  Delivery date: ${deleveryHeader}
                </div>
  
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${productItem.image}">
  
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${productItem.name}
                    </div>
                    <div class="product-price">
                      $${((productItem.priceCents)/100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">2</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link"
                      data-product-id="${productItem.id}">
                        Delete
                      </span>
                    </div>
                  </div>
                  ${getDeliveryOptionsUi(productItem.id,item.deliveryOptionId)}
  
                </div>
              </div>
        `
    });
  
    //controll secktion:
    //With querySelector we are pulling the content of the picked HTMLelement into the JS code,by doing so we gain controll over it
    document.querySelector('.order-summary').
    innerHTML = htmlData;
  
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click',()=>{
        const itemId = link.dataset.productId;
        removeCartItem(itemId);
        document.querySelector('.js-item-id-'+itemId).remove();
      })
    });
  
    document.querySelectorAll('.js-delivery-option').
      forEach((element) => {
        element.addEventListener('click',()=>{
          const a = element.dataset.productId;
          const b = element.dataset.deliveryOptionId
          updateItemDeliveryOption(a,b);
          renderOrderSummary();
      })
    });
  }