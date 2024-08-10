import {getCartCosts} from '../../data/cart.js'

export function renderPaymentSummary(){
    //update payment summary
    const a = getCartCosts();
    const totalBeforeTax = Number(((a.deliveriesSum+a.productsSum)/100).toFixed(2));
    const estematedTax = Number((totalBeforeTax*0.1).toFixed(2));

    document.querySelector('.js-payment-section').
    innerHTML = `
    <div class="payment-summary js-payment-section">
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${a.items}):</div>
      <div class="payment-summary-money">$${(a.productsSum/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${(a.deliveriesSum/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${estematedTax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${(totalBeforeTax+estematedTax).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
`

}