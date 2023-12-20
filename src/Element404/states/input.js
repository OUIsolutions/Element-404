
/**
 @typedef {object} InputRenderProps
 @property {boolean=true} render_keyup
 @property {boolean=false} render_focusout
 @property {boolean=true} prevent_locker
 */


/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 * @param {InputRenderProps} render_props
 * @returns {any}
 */
Element404.prototype.stateInput= function(state,name,props=null,render_props={render_keyup:true,render_focusout:false,prevent_locker:true}) {

    let old_value = state[name];
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


            state[name] = input.value
            if(render_keyup){
                this.last_input = new LastInput(state,name,input.selectionStart);
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

    if(this.last_input && render_keyup){
        if(state === this.last_input.state && name === this.last_input.name){
            this.last_input.input = created.root;
        }
    }
    return old_value;

}
