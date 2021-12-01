
require("../assets/less/main.less");
import "core-js/stable";

import Model from "./Model";
import Controller from "./Controller";

let model = new Model();
let controller  = new Controller(model);
