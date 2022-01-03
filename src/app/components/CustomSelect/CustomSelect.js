import AbstractComponent from "../AbstractComponent";
import {getElement, getElementFromNode, replaceNodeWithHtml} from "../../helpers/NodeUtils";

export default class CustomSelect extends AbstractComponent {
  constructor(observer, getValue, getList, emitValueChanged) {
    super();
    this.observer = observer;

    if (CustomSelect.count === undefined) CustomSelect.count = 0;
    this.id = CustomSelect.count++;

    this.getValue = getValue;
    this.getList = getList;
    this.emitValueChanged = emitValueChanged.bind(this);

    this.SavedCurrentValue = getValue();
    this.SavedList = getList();
    this.DOM_id = "custom-select" + this.id;
  }

  getTemplate() {
    return `
      <div class="custom-select" id="${ this.DOM_id }">
        <input
          class="custom-select__input"
          list="${ "datalist-id" + this.id }"
          value="${ this.SavedCurrentValue }"
        >
        <datalist id="${ "datalist-id" + this.id }">${this.SavedList.reduce((p, item) => p + `
          <option value="${item}">${item}</option>`, "")}
        </datalist>
      </div>`;
  }

  render() {
    //TODO: if component is error throw error or teleport to new node
    activateMutationObserver.call(this);

    return this.getTemplate();
  }

  update = ()=> {
    if(getElement(this.DOM_id) === null) {
      this.observer.unsubscribe(this.update);

    }else if (this.SavedCurrentValue !== this.getValue() || this.SavedList !== this.getList()) {
      this.SavedCurrentValue = this.getValue();
      this.SavedList = this.getList();
      replaceNodeWithHtml(getElement(this.DOM_id), this.getTemplate());
      activateListeners.call(this);
    }
  };
}

function activateListeners() {
  let input = getElementFromNode("custom-select__input", getElement(this.DOM_id));
  input.addEventListener("change", () => {

    let newInputValueExistInList = this.getList().find(element => element === input.value);
    if (newInputValueExistInList) {
      this.SavedCurrentValue = input.value.toUpperCase();
      this.emitValueChanged(input.value);

    }else {
      input.value = this.SavedCurrentValue;
    }

    input.blur();
  });


  input.addEventListener("focusin", () => {
    input.value = "";
  });

  input.addEventListener("focusout", () => {
    if (input.value === "") {
      input.value = this.SavedCurrentValue;
    }
  });
}

function activateMutationObserver() {
  const mutationConfig = { attributes: false, childList: true, subtree: true };
  const mutationObserver = new MutationObserver(() => {
    let customSelectNode = getElement(this.DOM_id);
    if (customSelectNode) {
      this.observer.subscribe(this.update);
      this.update();
      mutationObserver.disconnect();
    }
  });
  mutationObserver.observe(document.body, mutationConfig);
}
