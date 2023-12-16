

/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 */
Element404.prototype.stateInput= function(state,name,props) {


    let old_value = state[name];

    let formated_props = {
        keyup:(input)=>{
            state[name] = input.value
        }
        
        
    }

    if(old_value){
        formated_props.value = old_value
    }
    for(let key in props){
            formated_props[key] = props[key];
    }

    this.input(formated_props);
    return old_value;
}
