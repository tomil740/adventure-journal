export const deliveryOptions=[
    {
        id:1,
        deliverDays:1,
        price: 999
    },
    {
        id:2,
        deliverDays:3,
        price: 499
    },
    {
        id:3,
        deliverDays:9,
        price: 0
    },
]

export function getDeliveryOptionById(theId){
    let thePick =deliveryOptions[0];
    deliveryOptions.forEach((item) =>{
        if(theId == item.id){
            thePick = item;
        }
    });
    return thePick;
}