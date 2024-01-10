


/**
 @typedef {Object} InputStateProps
 @property {string=} default_value
 @property {boolean=}prevent_locker
 @property {boolean=}render_change
 */



/**
 * @param {string} name
 * @param {InputStateProps=} state_props
 * @returns {Element404}
 */
Element404.prototype.stateInput= function(name,state_props) {

    let formatted_props = new Element404Args(state_props,{});

    let default_value = formatted_props.get(ELEMENT_404_VALUE,ELEMENT_404_EMPTY);
    formatted_props.value = this.getStateValue(name, default_value)


    formatted_props[ELEMENT_404_CHANGE] =(input)=>{

            this.setStateValue(name,input.value);
    }

    return this.input(formatted_props);

}
