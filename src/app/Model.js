import Observer from "./Observer";

let fetchedData = {
  "query":{
    "base_currency":"USD",
    "timestamp":1632911490,
  },
  "data":{
    "JPY":110.432,
    "BGN":1.661,
    "CZK":21.517,
    "DKK":6.305,
    "GBP":0.729,
    "HUF":296.729,
    "PLN":3.831,
    "RON":4.195,
    "SEK":8.619,
    "CHF":0.924,
    "ISK":127.627,
    "NOK":8.703,
    "HRK":6.339,
    "RUB":73.415,
    "UAH":26,
    "USD":1,
  }
};

const NAME = 0;
const RATE = 1;

export default class Model {
  constructor(){
    this._baseCurrencyName = "UAH";
    this._currencyData = Object.entries(fetchedData.data);
    this.observer = new Observer();

  }

  getCurrencyNames() {

    return this._currencyData.map(currency => currency[NAME]);
  }

  getBaseCurrencyName() {
    return this._baseCurrencyName;
  }

  setBaseCurrencyName = (newName) =>{
    console.log("in model")
    console.log(newName)
    let currency = findCurrency.call(this, newName);

    if(currency){
      this._baseCurrencyName = newName;
      this.observer.notify();

      return true;
    }

    return false;
  };

  getBaseCurrencyRate() {
    let currency = findCurrency.call(this, this._baseCurrencyName);
    if(currency) {
      return currency[RATE];
    }

    return undefined;
  }
}

function findCurrency (currencyName) {
  return this._currencyData.find(currency => currency[NAME] === currencyName);
}




