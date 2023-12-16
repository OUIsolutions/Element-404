

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


Element404.prototype.stateSelect = function(state,name,options,props){

    let formated_props = {
        change:(select)=>{
            state[name] = select.value;
            this.render();
        }
    }
    for(let key in props){
        formated_props[key] = props[key];
    }
    this.select(formated_props,()=>{
        for(let option of options){
            this.option({value:option},option);
        }
    });
}
