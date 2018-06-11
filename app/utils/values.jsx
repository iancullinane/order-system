import _ from 'underscore';
import { SALES_TAX } from 'config/config.js';


export var CalculateTotal = function(arr, property){

  var price;
  var sum;
  var quantity;
  var total_quantity
  var total_price = 0;
  
  if (arr.length == 0){
    return 0;
  }
  
  if (property === "price"){

    _.each(arr, (order)=>{
      quantity = Number.parseInt(order.quantity);
      price = Number.parseInt(order.item.price);
      total_price = total_price + (price * quantity);
    })

    total_price = total_price + (total_price * SALES_TAX);
    return total_price.toFixed(2);
  }

  sum = _.pluck(arr, property);
  total_quantity = sum.reduce((a, b)=>{
    return Number(a) + Number(b);
  })

  return total_quantity;
}

export var CalculateTax = (number) => {
  console.log(number * SALES_TAX);
}