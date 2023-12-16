

/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 */
Element404.prototype.stateInput= function(state,name,props) {

    let old_value = state[name];

    let formatted_props = {

        "notLock_keyup":(input)=>{
            if(this.locked){
                this.render();
                return;
            }

            state[name] = input.value
        },

        "focusout":()=>{
            this.render();
        }

        
        
    }

    if(old_value){
        formatted_props.value = old_value
    }
    for(let key in props){
            formatted_props[key] = props[key];
    }

    this.input(formatted_props);

}


/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {object} props
 * @param {string} content
 * @param {string} tag
 */
Element404.prototype.stateIncrease = function(state, name, value, props, content, tag='button'){

    let formatted_props = {
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
        formatted_props[key] = props[key];
    }
    this.create(tag,formatted_props,content);

}

/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {object} props
 * @param {string} content
 * @param {string} tag
 */
Element404.prototype.stateDecrease = function(state, name, value, props, content, tag='button'){

    let formatted_props = {
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
        formatted_props[key] = props[key];
    }
    this.create(tag,formatted_props,content);


}

/**
* @param {object} state
* @param {string} name
* @param {Array | Object} options
* @param {object} props
*/
Element404.prototype.stateSelect = function(state,name,options,props){

    let formatted_props = {
        "not_lock_render_change":(select)=>{
            if(this.locked){
                return;
            }
            state[name] = select.value;
           
        }

    }
    
    for(let key in props){
        formatted_props[key] = props[key];
    }

    
    if(options.constructor.name === 'Object'){
        this.select(formatted_props,()=>{
            for(let key in options){
                if(key === state[name]){
                    this.option({value:key,selected:true},options[key]);
                    continue;
                }
                this.option({value:key},options[key]);
            }
        });        
    }
    

    if(options.constructor.name === 'Array'){
        this.select(formatted_props,()=>{
            options.forEach((option)=>{
                if(option === state[name]){
                    this.option({value:option,selected:true},option);
                    return;
                }
                this.option({value:option},option);
            });
        });        
    }

}


Element404.prototype.stateSetter = function(
    state,
    name,
    value,
    props_if_true,
    props_if_false,
    content,
    tag='button'){


    let old_value = state[name];

    let formatted_props = {
        render_click:()=>{
            
            state[name] = value;
            this.render();
        }
    }
    
    if(old_value === value){
        for(let key in props_if_true){
            formatted_props[key] = props_if_true[key];
        }
    }
    
    if (old_value !== value){
        for(let key in props_if_false){
            formatted_props[key] = props_if_false[key];
        }
    }
    
    this.create(tag,formatted_props,content);

}
