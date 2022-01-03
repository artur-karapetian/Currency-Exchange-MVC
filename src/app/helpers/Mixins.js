export function setBaseCurrencyName (newValue) {
  this.eventBus.publish(this.eventBus.events.setBaseCurrencyName, newValue);
};

export function setSecondCurrencyName(newValue) {
  this.eventBus.publish(this.eventBus.events.setSecondCurrencyName, newValue);
};