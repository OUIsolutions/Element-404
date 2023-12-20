

/**
 * @param {string} name
 * @param {Array<string> | Object} options
 * @param {object} props
 */
Element404.prototype.stateSelect = function(name,options,props=null){

    let formatted_props = {
        "notLock_render_change":(select)=>{
            if(this.locked){
                return;
            }

            this.stored_state[name] = select.value;

        }

    }

    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.select(()=> {
            if (options.constructor.name === 'Object') {

                for (let key in options) {
                    if (key === this.stored_state[name]) {
                        this.option(options[key], {"value": key, "selected": true});
                        continue;
                    }
                    this.option(options[key], {"value": key});
                }
            }

            if (options.constructor.name === 'Array') {
                options.forEach((option) => {
                    if (option === this.stored_state[name]) {
                        this.option(option, {"value": option, "selected": true});
                        return;
                    }
                    this.option(option, {"value": option});
                }, formatted_props);

            }
        }

        ,formatted_props);
}

