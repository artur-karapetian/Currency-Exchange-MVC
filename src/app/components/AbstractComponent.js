
export default class AbstractComponent {

  constructor() {
    if (this.constructor === AbstractComponent) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
}