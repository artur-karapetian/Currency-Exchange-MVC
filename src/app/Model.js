import Observer from "./Observer";

// let fetchedData = {
//   query: {
//     base_currency: "USD",
//     timestamp: 1632911490,
//   },
//   data: {
//     JPY: 110.432,
//     BGN: 1.661,
//     CZK: 21.517,
//     DKK: 6.305,
//     GBP: 0.729,
//     HUF: 296.729,
//     PLN: 3.831,
//     RON: 4.195,
//     SEK: 8.619,
//     CHF: 0.924,
//     ISK: 127.627,
//     NOK: 8.703,
//     HRK: 6.339,
//     RUB: 73.415,
//     UAH: 26,
//     USD: 1,
//   },
// };

const NAME = 0;
const RATE = 1;
const BOOKMARK = 2;
const BOOKMARKED = true;

export default class Model {
  constructor() {
    this.observer = new Observer();
    this._baseCurrencyName = "EUR";
    this._secondCurrencyName = "UAH";
    this._currencyData = [];

    loadData.call(this);
  }

  getCurrencyData() {
    return this._currencyData;
  }

  getCurrencyNames() {
    return this._currencyData.map((currency) => currency[NAME]);
  }

  getBaseCurrencyName() {
    return this._baseCurrencyName;
  }

  setBaseCurrencyName = (newName) => {
    let currency = findCurrency.call(this, newName);

    if (currency) {
      this._baseCurrencyName = newName;
      loadData.call(this);

      return true;
    }

    return false;
  };

  getBaseCurrencyRate() {
    let currency = findCurrency.call(this, this._baseCurrencyName);
    if (currency) {
      return currency[RATE];
    }

    return undefined;
  }

  getSecondCurrencyName() {
    return this._secondCurrencyName;
  }

  setSecondCurrencyName = (newName) => {
    let currency = findCurrency.call(this, newName);

    if (currency) {
      this._secondCurrencyName = newName;
      this.observer.notify();

      return true;
    }

    return false;
  };

  getSecondCurrencyRate() {
    let currency = findCurrency.call(this, this._secondCurrencyName);
    if (currency) {
      return currency[RATE];
    }

    return undefined;
  }

  setFavoriteStatus(currencyName, status) {
    let currency = findCurrency.call(this, currencyName);
    currency[BOOKMARK] = status;
  }
}

function findCurrency(currencyName) {
  return this._currencyData.find((currency) => currency[NAME] === currencyName);
}

function loadData() {
  try {
    fetch(
      `https://freecurrencyapi.net/api/v2/latest?apikey=ae8ab4f0-43cc-11ec-9d80-9f753414f6f7&base_currency=${this._baseCurrencyName}`
    )
      .then((res) => res.json())
      .then((fetchData) => {
        let newCurrencyData = Object.entries(fetchData.data);

        let bookmarkedCurrencies = this._currencyData.filter(
          (currency) => currency[BOOKMARK] === BOOKMARKED
        );

        newCurrencyData.forEach((currency) => {
          let bookmark = bookmarkedCurrencies.some(bookmarkedCurrency =>
            bookmarkedCurrency[NAME] === currency[NAME]
          );
          currency.push(bookmark);
        });

        newCurrencyData.sort((currency1, currency2) =>
          currency1[NAME].localeCompare(currency2[NAME]));

        this._currencyData = newCurrencyData;
        this.observer.notify();
      });

  } catch (error) {
    console.log(error);
  }
}
