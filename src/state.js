

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


/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {object} props
 * @param {string} content
 * @param {string} tag
 */
Element404.prototype.stateIncreaser = function(state,name,value,props,content,tag='button'){

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
    this.create(tag,formated_props,content);

}

/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {object} props
 * @param {string} content
 * @param {string} tag
 */
Element404.prototype.stateDecreaser = function(state,name,value,props,content,tag='button'){

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
    this.create(tag,formated_props,content);


}

/**
* @param {object} state
* @param {string} name
* @param {Array | Object} options
* @param {object} props
*/
Element404.prototype.stateSelect = function(state,name,options,props){

    let formated_props = {
        render_change:(select)=>{
            
            state[name] = select.value;
           
        }

    }
    
    for(let key in props){
        formated_props[key] = props[key];
    }

    
    if(options.constructor.name === 'Object'){
        this.select(formated_props,()=>{
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
        this.select(formated_props,()=>{
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
    seted_props,
    unseted_props,
    content,
    tag='button'){


    let old_value = state[name];

    let formated_props = {
        render_click:()=>{
            
            state[name] = value;
            this.render();
        }
    }
    
    if(old_value === value){
        for(let key in seted_props){
            formated_props[key] = seted_props[key];
        }
    }
    
    if (old_value !== value){
        for(let key in unseted_props){
            formated_props[key] = unseted_props[key];
        }
    }
    
    this.create(tag,formated_props,content);

}
