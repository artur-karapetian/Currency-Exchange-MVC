import AbstractComponent from "../AbstractComponent";
import {
    getElement,
    setHtmlToNode
} from "../../helpers/NodeUtils";


export default class CustomSelect extends AbstractComponent {

    constructor(observer, getCurrentValue, getList, setCurrentValue) {
        super();
        observer.subscribe(this.update);

        if(CustomSelect.count===undefined) CustomSelect.count=0;
        this.id = CustomSelect.count++;

        this.getCurrentValue = getCurrentValue;
        this.getList = getList;
        this.setCurrentValue = setCurrentValue;

        this.SavedCurrentValue = getCurrentValue();
        this.SavedList = getList();

    }

    appendTo(node) {
        //TODO: if component is attached throw error or teleport to new node
        setHtmlToNode(node, this.render());
    }

    render() {
        this.DOM_id = 'custom-select'+this.id;
        activateMutationObserver.call(this);

        return `
            <div class="custom-select" id="${ this.DOM_id}">
                <input list="${ 'datalist-id'+this.id }" class="custom-select__input" value="${ this.SavedCurrentValue }">

                <datalist id="${ 'datalist-id'+this.id }">${this.SavedList.reduce((p, item) => p +
                    `<option value="${item}">${item}</option>`, "")}
                </datalist>
                <button class="btn">btn</button>
            </div>`;
    }

    update = () => {
        let currentValueChanged = this.SavedCurrentValue !== this.getCurrentValue();
        if(currentValueChanged) {
            let customSelectInput = getElement('custom-select__input')
            customSelectInput.value = this.getCurrentValue();
        }
    }
}

function activateListeners(customSelectNode) {
    customSelectNode.addEventListener('change', () => {
        let currentValueInput = getElement('custom-select__input');
        this.setCurrentValue(currentValueInput.value);
    });
}

function activateMutationObserver(){
    const mutationConfig = { attributes: false, childList: true, subtree: false };
    const observer = new MutationObserver(()=>{
        let customSelectNode = getElement(this.DOM_id);
        if(customSelectNode) {
            activateListeners.call(this, customSelectNode);
            observer.disconnect();
        }
    });
    observer.observe(document.body, mutationConfig);
}

// activateListeners() {
// let secondCurrency = getElementFromNode(this.documentFragment, this.classCustomSelect__input);
// console.log(secondCurrency)
// secondCurrency.addEventListener("change", () => {
//     // this.model.setSecondCurrency(secondCurrency.value);
//     console.log(this.eventBus.events.setSecondCurrencyName);
//     console.log(secondCurrency.value);
//     this.eventBus.publish(this.eventBus.events.setSecondCurrencyName, secondCurrency.value);
//     console.log(this.model)
//
//     secondCurrency.blur();
//
// });
//
// secondCurrency.addEventListener("click", () => {
//     secondCurrency.value = "";
// });
//
// secondCurrency.addEventListener("focus", () => {
//     secondCurrency.value = "";
// });
// }