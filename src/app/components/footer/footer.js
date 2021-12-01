
import AbstractComponent from "../AbstractComponent";

export default class Footer extends AbstractComponent {

  constructor(model){
    super(model);
  }

  render(mountPlace){
  }

  getTemplate(){
    return `
      <footer class="footer">
        &copy; Artur Karapetian
      </footer>`;
  }
}