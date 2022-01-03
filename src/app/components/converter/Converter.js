import * as Mixin from '../../helpers/Mixins';
import AbstractComponent from "../AbstractComponent";
import CustomSelect from "../CustomSelect/CustomSelect";
import { getElement } from "../../helpers/NodeUtils";

require("./converter.less");

export default class Converter extends AbstractComponent {
  constructor(model, controller) {
    super();
    this.model = model;
    this.controller = controller;
  }

  template() {
    return `
      <section class="converter">
        <h3>Convert Currencies</h3>
        <div class="currency-section">
          <span>From (base currency):</span>
          ${new CustomSelect(
            this.model.observer,
            () => this.model.getBaseCurrencyName(),
            () => this.model.getCurrencyNames(),
            (newValue) => Mixin.setBaseCurrencyName.call(this.controller, newValue)
          ).render()}
        </div>
        <div class="currency-section">
          <span>To:</span>          
          ${new CustomSelect(
            this.model.observer,
            () => this.model.getSecondCurrencyName(),
            () => this.model.getCurrencyNames(),
            (newValue) => Mixin.setSecondCurrencyName.call(this.controller, newValue)
          ).render()}          
        </div>
        <div class="converter__exchange-rate currency-section">
          ${ getExchangeRateHTML.call(this) }
        </div>
        <div class="currency-section">
          <span>Amount:</span>
          <input class="converter__amount-to-convert" type="number" min="0" />
        </div>
        <div class="currency-section">
          Result: <span class="converter__result">${ getConversionResult.call(this) }</span>
        </div>
      </section>`;
  }


  render() {
    activateMutationObserver.call(this);

    return this.template();
  }

  update = () => {
    if(this.referenceInDOM.parentElement===null) {
      this.model.observer.unsubscribe(this.update);

    }else {
      let exchangeRateDisplay = getElement("converter__exchange-rate");
      exchangeRateDisplay.innerText = getExchangeRateHTML.call(this);
      displayConversionResult.call(this);
    }
  }
}

function updateCurrencyData() {
  this.baseCurrencyName = this.model.getBaseCurrencyName();
  this.baseCurrencyRate = this.model.getBaseCurrencyRate() === undefined ? '1' : this.model.getBaseCurrencyRate();
  this.secondCurrencyName = this.model.getSecondCurrencyName();
  this.secondCurrencyRate = this.model.getSecondCurrencyRate();
}

function getExchangeRateHTML() {
  updateCurrencyData.call(this);

  return `${ this.baseCurrencyRate } ${ this.baseCurrencyName } = ${ this.secondCurrencyRate } ${ this.secondCurrencyName }`;
}

function getConversionResult(amountToConvert) {
   if(amountToConvert) {
     updateCurrencyData.call(this);
     return (amountToConvert * this.secondCurrencyRate).toFixed(2);
   }

   return '0.00';
}

function displayConversionResult(){
  let amountToConvert = getElement('converter__amount-to-convert');
  let conversionResult = getElement('converter__result');
  conversionResult.innerText = getConversionResult.call(this, amountToConvert.value);
}

function addListeners() {
  let converterNode = getElement('converter');
  converterNode.addEventListener('keyup', () => {
    displayConversionResult.call(this);
  });
}

const mutationConfig = { attributes: false, childList: true, subtree: true };
function activateMutationObserver(){
  const observer = new MutationObserver(()=>{

    let converterNode = getElement('converter');
    if(converterNode) {
      this.referenceInDOM = converterNode;
      this.model.observer.subscribe(this.update);
      this.update();
      addListeners.call(this);
      observer.disconnect();
    }
  });
  observer.observe(document.body, mutationConfig);
}