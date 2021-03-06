export function getElement(ClassName_Or_Id){
    return getElementFromNode(ClassName_Or_Id, document);
}

export function getElementFromNode(ClassName_Or_Id, Node){
    let searchedNode = ClassName_Or_Id;

    if(typeof searchedNode === 'string') {
        searchedNode = Node.querySelector('.'+ClassName_Or_Id);

        if(!searchedNode) {
            searchedNode = Node.querySelector('#'+ClassName_Or_Id);
        }
    }

    if(searchedNode instanceof HTMLElement){
        return searchedNode;
    }

    return null;
}

export function setHtmlToNode(nodeToUpdate, html) {
    let node = getElement(nodeToUpdate);

    if(node) {
        node.innerHTML = html;
        return true;
    }

    return false;
}

export function createDocFragment(html) {
    let range = document.createRange();

    return range.createContextualFragment(html);
}

export function replaceNodeWithHtml(node, html) {
    let docFragment = createDocFragment(html);

    return replaceNode(node, docFragment);
}

export function appendElementToNode(Element, Node){
    getElement(Node).appendChild(Element);
}

function replaceNode(oldNode, newNode) {
    let nodeToReplace = getElement(oldNode);

    if(nodeToReplace){
        let parent = nodeToReplace.parentNode;
        parent.replaceChild(newNode, nodeToReplace);

        return true;
    }

    return false;
}
