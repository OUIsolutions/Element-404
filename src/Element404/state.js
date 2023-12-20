

/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 */
Element404.prototype.stateInput= function(state,name,props=null) {

    let old_value = state[name];

    let formatted_props = {

        "notLock_keyup":(input)=>{
            if(this.locked){
                this.render();
                return;
            }
            this.last_input = new LastInput(state,name,input.selectionStart);
            state[name] = input.value
            this.render();
        },

        'focusout':(input)=>{
           // this.last_input = undefined;
        }


        
    }

    if(old_value){
        formatted_props.value = old_value
    }
    for(let key in props){
            formatted_props[key] = props[key];
    }
    let created =this.input(formatted_props);

    if(this.last_input){
        if(state === this.last_input.state && name === this.last_input.name){
            console.log("determinou como root")

            this.last_input.input = created.root;
        }
    }


}


/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {string} tag
 * @param {object} props
 */
Element404.prototype.stateIncrease = function(state, name, value, content, tag='button',props=null){

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
    this.create(tag,content,formatted_props);

}

/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {string} tag
 * @param {object} props
 */
Element404.prototype.stateDecrease = function(state, name, value, content,  tag='button',props=null){

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
    this.create(tag,content,formatted_props);


}

/**
* @param {object} state
* @param {string} name
* @param {Array<string> | Object} options
* @param {object} props
*/
Element404.prototype.stateSelect = function(state,name,options,props=null){

    let formatted_props = {
        "notLock_render_change":(select)=>{
            if(this.locked){
                return;
            }

            state[name] = select.value;
           
        }

    }
    
    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.select(()=> {
            if (options.constructor.name === 'Object') {

                for (let key in options) {
                    if (key === state[name]) {
                        this.option(options[key], {"value": key, "selected": true});
                        continue;
                    }
                    this.option(options[key], {"value": key});
                }
            }

            if (options.constructor.name === 'Array') {
                options.forEach((option) => {
                    if (option === state[name]) {
                        this.option(option, {"value": option, "selected": true});
                        return;
                    }
                    this.option(option, {"value": option});
                }, formatted_props);

            }
        }

    ,formatted_props);
}


Element404.prototype.stateSetter = function(
    state,
    name,
    value,
    selected_value,
    unselected_value
    ){


    let old_value = state[name];

    let formatted_props = {
        render_click:()=>{
            
            state[name] = value;
            this.render();
        }
    }
    let is_selected = old_value === value;
    /**@type {object}*/
    let corresponded_value= is_selected ? selected_value: unselected_value;
    let props = corresponded_value.props;

    /**@type {string}*/
    let tag = corresponded_value.tag ? corresponded_value.tag: "button";
    let content = corresponded_value.content;

    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.create(tag,content,formatted_props);


}
