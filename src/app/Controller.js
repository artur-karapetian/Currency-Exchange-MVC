import {eventBus} from "./EventBus";
import Converter from "./components/converter/Converter";

let events = {
  setBaseCurrencyName: "setBaseCurrencyName",
  setSecondCurrencyName: "setSecondCurrencyName",
};

export default class Controller {

  constructor(model) {
    this.model = model;

    eventBus.events = events;
    eventBus.subscribe(events.setBaseCurrencyName, this.model.setBaseCurrencyName);

    let converter = new Converter(model, eventBus);
    converter.appendTo('main');

    // setHtmlToNode('main', converter.render());
  }
}

