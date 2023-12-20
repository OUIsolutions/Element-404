
/**
 @typedef {object} InputRenderProps
 @property {boolean=true} render_keyup
 @property {boolean=false} render_focusout
 @property {boolean=true} prevent_locker
 */


/**
 * @param {string} name
 * @param {object} props
 * @param {InputRenderProps} render_props
 * @returns {any}
 */
Element404.prototype.stateInput= function(name,props=null,render_props={render_keyup:true,render_focusout:false,prevent_locker:true}) {

    let old_value = this.stored_state[name];
    let formatted_render_props = new Element404Args(render_props,{});
    let prevent_locker =formatted_render_props.get('prevent_locker',true);
    let render_keyup = formatted_render_props.get('render_keyup',true);
    let render_focusout = formatted_render_props.get('render_focusout',false);


    let formatted_props = {

        "notLock_keyup":(input)=>{
            if(this.locked &&prevent_locker ) {
                this.render();
                return;
            }


            this.stored_state[name] = input.value
            if(render_keyup){
                this.father.last_input = new LastInput(this.stored_state,name,input.selectionStart);
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
        formatted_props[key] = props[key];
    }
    let created =this.input(formatted_props);
    let last_input = this.father.last_input;
    if(last_input && render_keyup){
        if(this.stored_state === last_input.state && name === last_input.name){
            last_input.input = created.root;
        }
    }
    return old_value;

}
