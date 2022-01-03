
export default class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(newHandler) {
        let handlerExist = this.observers.find(handler => handler===newHandler);
        if(!handlerExist) this.observers.push(newHandler);
    }

    notify(data) {
        this.observers.forEach(handler => handler(data));
    }

    unsubscribe(handlerRemove) {
        this.observers = this.observers.filter(handler => handler !== handlerRemove);
    }
}
