

/**
 * @param {object} state
 * @returns {Element404}
 * */
Element404.prototype.state = function(state) {

    let sub_element = new Element404();

    if(state){
        sub_element.stored_state = state
    }
    sub_element.sub_element(this,this.root);
    return sub_element
}
