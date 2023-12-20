
Element404.prototype.stateSetter = function(
    name,
    value,
    selected_value,
    unselected_value
){


    let old_value = this.stored_state[name];

    let formatted_props = {
        render_click:()=>{

            this.stored_state[name] = value;
            this.render();
        }
    }
    let is_selected = old_value === value;
    /**@type {object}*/
    let corresponded_value= is_selected ? selected_value: unselected_value;
    let props = corresponded_value.props;

    /**@type {string}*/
    let tag = corresponded_value.tag ? corresponded_value.tag: "button";
    let content = corresponded_value.content;

    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.create(tag,content,formatted_props);


}
