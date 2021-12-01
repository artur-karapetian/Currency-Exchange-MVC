
export default class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(handler) {
        this.observers.push(handler);
    }

    notify(data) {
        this.observers.forEach(handler => handler(data));
    }
}
