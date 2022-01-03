import { setBaseCurrencyName } from '../../helpers/Mixins';
import AbstractComponent from "../AbstractComponent";
import CustomSelect from "../CustomSelect/CustomSelect";
import {getElement, getElementFromNode} from "../../helpers/NodeUtils";

require("./exchange.less");

const NAME = 0;
const RATE = 1;

export default class Exchange extends AbstractComponent {
  constructor(model, controller) {
    super();
    this.model = model;
    this.controller = controller;
  }

  render() {
    activateMutationObserver.call(this);

    return `
      <section class="exchange">
        <h3>Exchange Rates</h3>
        <div class="section section__base-currency">
          ${new CustomSelect(
            this.model.observer,
            () => this.model.getBaseCurrencyName(),
            () => this.model.getCurrencyNames(),
            (newValue) => setBaseCurrencyName.call(this.controller, newValue)
          ).render()}
        </div>
        <div class="section">
          Filter:
          <input class="currencyFilter" type="text">
        </div>
        <div class="section">
          <ul class="rate-list">${ renderCurrencyList.call(this, `
            <li class="rate-list__item">
              <input class="rate-list__favorite" type="checkbox" checked data-currency-name="{{ currencyName }}">
              <div class="rate-list__currency">
                {{ currencyName }}
              </div>
              <div class="rate-list__rate">
                {{ currencyRate }}
              </div>
            </li>`)}   
          </ul>
        </div>
      </section>`;
  }

  update = () => {
    if(this.referenceInDOM.parentNode === null) {
      this.model.observer.unsubscribe(this.update);

    }else {
      let ratesListNode = getElementFromNode('rate-list', this.referenceInDOM);
      ratesListNode.innerHTML = renderCurrencyList.call(this);
    }
  }
}

function activateListeners() {

  this.referenceInDOM.addEventListener('keyup', () => {
    this.update();
  });

  this.referenceInDOM.addEventListener('change', event => {
    let checkedCurrency = event.target;

    if(checkedCurrency.className.includes('rate-list__favorite')) {
      this.model.setFavoriteStatus(checkedCurrency.dataset.currencyName, checkedCurrency.checked);
      this.update();
    }
  });
}

function renderCurrencyList(template) {
  const BOOKMARK_STATUS = 2;
  if(!this.currencyListTemplate) this.currencyListTemplate = template;
  let currencyData = this.model.getCurrencyData().slice();

  let filterConditionNode = getElement('currencyFilter');
  if(filterConditionNode){
    if (filterConditionNode.value) {
      let filterCondition = filterConditionNode.value.toUpperCase();

      currencyData = currencyData.filter(currency =>
        currency[NAME].includes(filterCondition));
    }
  }

  currencyData.sort((el1, el2) => {
    if (el1[BOOKMARK_STATUS] === true && el2[BOOKMARK_STATUS] === false)
      return -1;
    if (el1[BOOKMARK_STATUS] === el2[BOOKMARK_STATUS]) return 0;
    if (el1[BOOKMARK_STATUS] === false && el2[BOOKMARK_STATUS] === true)
      return 1;
  });

  return currencyData.reduce((p, currency) => {
    let renderedTemplate = this.currencyListTemplate;
    if(!currency[BOOKMARK_STATUS]) renderedTemplate = renderedTemplate.replace('checked', '');
    renderedTemplate = renderedTemplate.replaceAll('{{ currencyName }}', currency[NAME]);
    renderedTemplate = renderedTemplate.replace('{{ currencyRate }}', currency[RATE].toFixed(2));

    return p + renderedTemplate;
  }, "");
}

function activateMutationObserver(){
  const mutationConfig = { attributes: false, childList: true, subtree: true };

  const observer = new MutationObserver(()=>{
    let exchangeNode = getElement('exchange');
    if(exchangeNode) {
      this.referenceInDOM = exchangeNode;
      this.model.observer.subscribe(this.update);
      activateListeners.call(this);
      observer.disconnect();
    }
  });
  observer.observe(document.body, mutationConfig);
}