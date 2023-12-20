

/**
 * @param {string} element
 * @returns {Element404}
 * */
Element404.prototype.state = function(element) {

    let sub_element = new Element404();
    sub_element.stored_state = element;
    if(!element){
        sub_element.stored_state = {}
    }
    sub_element.sub_element(this,this.root);
    return sub_element
}
