import Header from "./components/header/header";
import { getElement } from "./helpers/NodeUtils";

let rootCatalog = '/';

let links = {
  root: rootCatalog,
  exchange: rootCatalog + "exchange",
};

export default class Router {
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.routes = [
      {
        path: links.root,
        component: () => import('./components/converter/Converter'),
      },
      {
        path: links.exchange,
        component: () => import('./components/exchange/Exchange'),
      },
    ];

    addListeners.call(this);

    let header = new Header(links.root, links.exchange);
    document.body.insertAdjacentHTML('afterbegin', header.render());
  }

  route() {
    let selectedRoute = this.routes.find(route => route.path === location.pathname);
    if(selectedRoute) {
      selectedRoute.component().then(module => {
        let component = new module.default(this.model, this.controller);
        getElement('main').innerHTML = component.render();
      });
    }
    //else display 404
  }
}

function addListeners() {
  window.addEventListener("popstate", (event) => {
    this.route();
  });

  document.addEventListener("DOMContentLoaded", () => {
    this.route();
  });

  document.body.addEventListener("click", (event) => {
    let clickedTarget = event.target;

    let clickedTargetIsAppRoute = this.routes.some(
      (route) => route.path === clickedTarget.getAttribute("href")
    );

    if (clickedTargetIsAppRoute) {
      event.preventDefault();
      history.pushState(null, null, clickedTarget["href"]);
      this.route();
    }
  });
}
