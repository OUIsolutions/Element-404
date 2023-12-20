

/**
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {string} tag
 * @param {object} props
 */
Element404.prototype.stateIncrease = function(name, value, content, tag='button',props=null){

    let formatted_props = {
        render_click:()=>{
            let old_value = Number(this.stored_state[name]);
            if(!old_value){
                old_value = 0;
            }
            this.stored_state[name] = old_value+value;
            this.render();
        }
    }
    for(let key in props){
        formatted_props[key] = props[key];
    }
    this.create(tag,content,formatted_props);

}
