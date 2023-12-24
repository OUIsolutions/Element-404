



/**
 * @param {object} key_or_index
 * @returns {Element404}
 * */
Element404.prototype.subStateObject = function(key_or_index) {

    let created =  this.stored_state[key_or_index];
    if(!created){
        created = {}
        this.stored_state[key_or_index] =created
    }
    let sub_element = new Element404();
    sub_element.sub_element(this,this.root);
    sub_element.stored_state = created
    return sub_element
}


/**
 * @returns {object || Array}
 * */
Element404.prototype.getFullState = function() {
    return this.stored_state;
}
/**
 * @param {string || number} key_or_index
 * @param {any} value
 * */
Element404.prototype.setStateValue = function(key_or_index,value) {
    this.stored_state[key_or_index] = value;
}

/**
 * @param {string || number} key_or_index
 * @param {any} default_value
 * */
Element404.prototype.getStateValue = function(key_or_index,default_value=undefined) {
  let existent = this.stored_state[key_or_index];
  if(existent === undefined){
      this.setStateValue(key_or_index,default_value);
      return default_value;
  }
  return existent;
}







