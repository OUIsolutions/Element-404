


Element404.prototype.stateDecrease = function(
    name,
    value,
    content,
    state_props
){

    let formatted_args = new Element404Args(state_props,{});
    let default_value = formatted_args.get(ELEMENT_404_START_VALUE,0);
    let tag = formatted_args.get(ELEMENT_404_TAG,ELEMENT_404_BUTTON);
    let props = formatted_args.get_no_listed();

    props.click =()=>{
        let old_value = Number(this.getStateValue(name,default_value));
        this.setStateValue(name,old_value-value);
    }

    return this.create(tag, content, props)

}
