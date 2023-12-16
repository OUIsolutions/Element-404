

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
        },
        focusout:(input)=>{
            this.render();
        }
        
        
    }

    if(old_value){
        formated_props.value = old_value
    }
    for(let key in props){
            formated_props[key] = props[key];
    }

    this.input(formated_props);
}


Element404.prototype.stateIncreaser = function(state,name,value,props,text){

    let formated_props = {
        render_click:()=>{
            let old_value = Number(state[name]);
            if(!old_value){
                old_value = 0;
            }
            state[name] = old_value+value;
            this.render();
        }
    }
    for(let key in props){
        formated_props[key] = props[key];
    }
    this.button(formated_props,text);
}


Element404.prototype.stateDecreaser = function(state,name,value,props,text){

    let formated_props = {
        render_click:()=>{
            let old_value = Number(state[name]);
            if(!old_value){
                old_value = 0;
            }
            state[name] = old_value-value;
            this.render();
        }
    }
    for(let key in props){
        formated_props[key] = props[key];
    }
    this.button(formated_props,text);
}

