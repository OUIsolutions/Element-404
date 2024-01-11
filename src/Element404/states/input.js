


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

    let formatted_args = new Element404Args(state_props,{});
    let prevent_locker =formatted_args.get('prevent_locker',true);
    let default_value = formatted_args.get(ELEMENT_404_VALUE,ELEMENT_404_EMPTY);
    let props = formatted_args.get_no_listed();
    props.value = this.getStateValue(name, default_value)

    props[ELEMENT_404_NOT_LOCK_CHANGE] =(input)=>{
            let old = this.getStateValue(name,ELEMENT_404_EMPTY);

            if(this.is_locked()  && prevent_locker){
                input.value =old;
                return;
            }


            this.setStateValue(name,input.value);
    }

    return this.input(props);

}
