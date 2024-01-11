/**
 @typedef {object} SelectStateProps
 @property {boolean=true} prevent_locker
 @property {boolean} render_change
 @property {string=null} default_value

 */



/**
 * @param {string} name
 * @param {Array<string> | Object} options
 * @param {SelectStateProps=} state_props
 * @returns {string}
 */
Element404.prototype.stateSelect = function(
    name,
    options,
    state_props
){


    let formatted_args = new Element404Args(state_props,{});
    let prevent_locker =formatted_args.get(ELEMENT_404_PREVENT_LOCKER,true);
    let default_value = formatted_args.get(ELEMENT_404_VALUE,options[0]);
    let props = formatted_args.get_no_listed();

    props[ELEMENT_404_NOT_LOCK_CHANGE] = (select)=>{
            if(this.is_locked()  && prevent_locker){
                this.render();
                return;
            }

            this.setStateValue(name,select.value);

    }


    this.select(()=> {
            let old_value =  this.getStateValue(name,default_value);

            if (options.constructor.name === 'Object') {

                for (let key in options) {
                    if (key === old_value) {
                        this.option(options[key], {"value": key, "selected": true});
                        continue;
                    }
                    this.option(options[key], {"value": key});
                }
            }

            if (options.constructor.name === 'Array') {
                options.forEach((option) => {
                    if (option === old_value) {
                        this.option(option, {"value": option, "selected": true});
                        return;
                    }
                    this.option(option, {"value": option});
                });
            }
        },props);


    return this.getStateValue(name,default_value);

}

