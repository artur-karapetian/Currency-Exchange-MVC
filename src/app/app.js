require("../assets/less/main.less");

import "core-js/stable";

import Model from "./Model";
import Controller from "./Controller";
import Router from "./Router";


let model = new Model();
let controller  = new Controller(model);
new Router(model, controller);

