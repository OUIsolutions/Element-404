



/**
 @typedef {object} NumbericalStateProps
 @property {boolean=} render_change
 @property {number=null} default_value
 @property {string=}tag
 */



/**
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {NumbericalStateProps=} state_props
 * @returns {Element404}
 */
Element404.prototype.stateDecrease = function(
    name,
    value,
    content,
    state_props
){

    let formatted_args = new Element404Args(state_props,{});

    let default_value = formatted_args.get('default_value',0);
    let tag = formatted_args.get("tag","button");
    let props = formatted_args.get_no_listed();

    let formatted_props = {
        click:()=>{
            let old_value = Number(this.getStateValue(name,default_value));
            this.setStateValue(name,old_value-value);
        }
    }

    for(let key in props){
        formatted_props[key] = props[key];
    }
    return this.create(tag, content, formatted_props)

}
