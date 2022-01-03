import EventBus from "./EventBus";

const events = {
  setBaseCurrencyName: "setBaseCurrencyName",
  setSecondCurrencyName: "setSecondCurrencyName",
};

export default class Controller {

  constructor(model) {
    this.model = model;
    this.eventBus = new EventBus();

    this.eventBus.events = events;
    this.eventBus.subscribe(events.setBaseCurrencyName, this.model.setBaseCurrencyName);
    this.eventBus.subscribe(events.setSecondCurrencyName, this.model.setSecondCurrencyName);
  }
}

