

/**
 * @param {object} state
 * @returns {Element404}
 * */
Element404.prototype.state = function(state) {

    let sub_element = new Element404();
    sub_element.sub_element(this,this.root);

    if(state){
        sub_element.stored_state = state
    }
    return sub_element
}
