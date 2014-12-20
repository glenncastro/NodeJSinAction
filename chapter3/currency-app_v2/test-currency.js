var Currency = require('currency');
var canadianDollar = 0.91;

var currency = new Currency(canadianDollar);
console.log("50 Canadian to US $: " + currency.canadianToUS(50));

console.log("50 US to Canadian $: " + currency.USToCanadian(50));