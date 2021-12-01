// import { eventBus } from "../../EventBus";

require("./converter.less");

import AbstractComponent from "../AbstractComponent";
import CustomSelect from "../CustomSelect/CustomSelect";

import {getElement, setHtmlToNode} from "../../helpers/NodeUtils";

export default class Converter extends AbstractComponent {
  constructor(model, eventBus) {
    super();
    this.model = model;
    this.eventBus = eventBus;
    this.model.observer.subscribe(this.update);
  }

  appendTo(node) {
    setHtmlToNode(node, this.render());
  }

  render() {
    let baseCurrencyName = this.model.getBaseCurrencyName();
    let baseCurrencyRate = this.model.getBaseCurrencyRate();

    let setBaseCurrencyName = (newValue) => {
      this.eventBus.publish(
        this.eventBus.events.setBaseCurrencyName,
        newValue
      );
    };

    return `
      <section class="converter">
        <p>base currency: ${baseCurrencyName}</p>
        <p>base currency rate:
          <span class="base-currency__rate">${baseCurrencyRate}</span>
        </p>
        
        ${new CustomSelect(
          this.model.observer,
          ()=>this.model.getBaseCurrencyName(),
          ()=>this.model.getCurrencyNames(),
          (newBaseCurrency)=>setBaseCurrencyName(newBaseCurrency)
        ).render()}

      </section>`;
  }

  update = () => {
    let baseCurrencyRateNode = getElement('base-currency__rate');
    baseCurrencyRateNode.innerText = this.model.getBaseCurrencyRate();
  }
}