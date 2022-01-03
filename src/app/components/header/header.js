require("./header.less");

import AbstractComponent from "../AbstractComponent";
import {getElement} from "../../helpers/NodeUtils";

export default class Header extends AbstractComponent{

  constructor(linkRoot, linkExchange) {
    super();
    this.linkRoot = linkRoot;
    this.linkExchange = linkExchange;
  }

  render() {
    // activateMutationObserver.call(this);

    return `
      <header class="header">        
        <h1>
          <a class="logo" href="/">Currency Exchange</a>
        </h1>        
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__item">
              <a class="nav__link" href="${ this.linkRoot }">Converter</a>
            </li>            
            <li class="nav__item">
              <a class="nav__link" href="${ this.linkExchange }">Exchange Rates</a>
            </li>
          </ul>
        </nav>
      </header>`;
  }
}

// function activateListeners(headerNode) {
//   headerNode.addEventListener("popstate", (event) => {
//     console.log("mm0");
//     event.preventDefault();
//   });
// }

// function activateMutationObserver(){
//   const mutationConfig = { attributes: false, childList: true, subtree: false };
//   const observer = new MutationObserver(()=>{
//     let headerNode = getElement('header');
//     if(headerNode) {
//       activateListeners.call(this, headerNode);
//       observer.disconnect();
//     }
//   });
//   observer.observe(document.body, mutationConfig);
// }