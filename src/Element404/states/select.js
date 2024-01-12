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

            let its_boolean = select.value  === 'true' || select.value === 'false';

            if(its_boolean){
                if(select.value === 'true'){
                    this.setStateValue(name,true);
                }

                if(select.value === 'false'){
                    this.setStateValue(name,false);
                }

            }
            if(!its_boolean){
                this.setStateValue(name,select.value);
            }

    }


    this.select(()=> {
            let old_value =  this.getStateValue(name,default_value);

            if (options.constructor.name === ELEMENT_404_OBJECT) {

                for (let key in options) {

                    let option  = this.option(options[key]);
                    option.set_prop(ELEMENT_404_VALUE,key);

                    if (key === old_value) {
                        option.set_prop(ELEMENT_404_SELECTED,true);
                    }

                }
            }


            if (options.constructor.name ===ELEMENT_404_ARRAY) {

                options.forEach((option) => {

                    let option_element =this.option(option);
                    if (option === old_value) {
                        option_element.set_prop(ELEMENT_404_SELECTED,true);
                    }

                });

            }

        },props);


    return this.getStateValue(name,default_value);

}

