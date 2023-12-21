


/**
 @typedef {Object} InputStateProps
 @property {boolean=} render_change
 @property {string=} default_value
 */



/**
 * @param {string} name
 * @param {InputStateProps=} state_props
 * @returns {string}
 */
Element404.prototype.stateInput= function(name,state_props) {


    let formatted_args = new Element404Args(state_props,{});
    /**@type {boolean}*/
    let prevent_locker =formatted_args.get('prevent_locker',true);
    /**@type {string}*/
    let default_value = formatted_args.get('default_value',"");
    /**@type {boolean}*/
    let render_change = formatted_args.get("render_change",true);
    let props =formatted_args.get_no_listed();
    let old_value = this.getStateValue(name,default_value);

    let formatted_props = {

        "notLock_change":(input,event)=>{
            if(this.locked &&prevent_locker ) {
                this.render();
                return;
            }
            console.log(document.activeElement)
            this.setStateValue(name, input.value);
            if(render_change){
                this.render();
            }
        },

    


    }

    if(old_value){
        formatted_props.value = old_value
    }

    for(let key in props){
        formatted_props[key] = formatted_args.element[key];
    }

   this.input(formatted_props);

    return old_value;

}
