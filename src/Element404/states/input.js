


/**
 @typedef {Object} InputStateProps
 @property {boolean=true} render_keyup
 @property {boolean=false} render_focusout
 @property {boolean=true} prevent_locker
 @property {string=} default_value
 */



/**
 * @param {string} name
 * @param {InputStateProps=} state_props
 * @returns {string}
 */
Element404.prototype.stateInput= function(name,state_props) {


    let formatted_args = new Element404Args(state_props,{});
    let prevent_locker =formatted_args.get('prevent_locker',true);
    let render_keyup = formatted_args.get('render_keyup',true);
    let render_focusout = formatted_args.get('render_focusout',false);
    let default_value = formatted_args.get('default_value',"");
    let props =formatted_args.get_no_listed();
    let old_value = this.getStateValue(name,default_value);

    let formatted_props = {

        "notLock_keyup":(input)=>{
            if(this.locked &&prevent_locker ) {
                this.render();
                return;
            }

            this.setStateValue(name, input.value);
            if(render_keyup){
                let created_last_input =  new LastInput(this.stored_state,name,input.selectionStart);
                if(this.child){
                    this.father.last_input =created_last_input
                }
                if(!this.child){
                    this.last_input  = created_last_input;
                }
                this.render();
            }


        },

        'focusout':()=>{
            if(render_focusout){
                this.render();
            }
        }



    }

    if(old_value){
        formatted_props.value = old_value
    }

    for(let key in props){
        formatted_props[key] = formatted_args.element[key];
    }

    let created =this.input(formatted_props);

    let last_input = this.last_input;

    if(this.child){
        last_input = this.father.last_input;
    }

    if(last_input && render_keyup){
        if(this.stored_state === last_input.state && name === last_input.name){
            last_input.input = created.root;
        }
    }
    return old_value;

}
