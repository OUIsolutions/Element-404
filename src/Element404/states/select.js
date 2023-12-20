/**
 @typedef {object} SelectRenderProps
 @property {boolean=true} prevent_locker
 @property {boolean} render_change
 @property {string=null} default_value
 */



/**
 * @param {string} name
 * @param {Array<string> | Object} options
 * @param {SelectRenderProps} render_props
 * @param {object} props
 * @returns {string}
 */
Element404.prototype.stateSelect = function(
    name,
    options,
    render_props={prevent_locker:true,render_change:true},
    props=null,

){


    let formatted_args = new Element404Args(render_props,{});
    let prevent_locker =formatted_args.get('prevent_locker',true);
    let render_change =  formatted_args.get("render_change",true);
    let default_value = formatted_args.get('default_value');


    let formatted_props = {
        "notLock_change":(select)=>{
            if(this.locked  && prevent_locker){
                this.render();
                return;
            }
            this.setStateValue(name,select.value);
            if(render_change){
                this.render();
            }
        }


    }

    for(let key in props){
        formatted_props[key] = props[key];
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
                }, formatted_props);

            }
        }

        ,formatted_props);

    return this.getStateValue(name,default_value);

}

