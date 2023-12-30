



/**
 * @param {string} key
 * @param {string | function || object} value
*/
Element404.prototype.set_prop = function(key,value){

    if(value instanceof Function){
        let callback = (event)=>{

            if(this.is_locked() && key.includes('notLock_') === false){
                return;
            }
            value(this.root,event)
            if(key.includes('render_')){

                this.render({root_render:true})
            }

        }

        const  TAGS  = ['render_','notLock_'];
        let formatted_key = key
        for (let tag of TAGS){
            formatted_key = formatted_key.replace(tag,'')
        }

        this.root.addEventListener(formatted_key,callback)
        return
    }

    this.root.setAttribute(key,value)
}




/**
 @typedef {function} Element404Event
 @param {HTMLElement} Element
 @param {UIEvent} event
 */

/**
 @typedef {object} Element404Props
 @property {object || string || undefined} style
 @property {Element404Event || undefined} click
 @property {Element404Event || undefined} render_click
 @property {Element404Event || undefined} NotLock_render_click
 @property {Element404Event|| undefined} change


 */


/**
 * @param {Element404Props || undefined } props
 *  */
Element404.prototype.set_props = function(props){
    this.props = props

    if(!props){
        return;
    }

    let style_args = props['style_args'];

    if(!style_args){
        style_args = {};
    }

    if(props['inline_style']){
        this.style_data = props['inline_style']
        this.inline_style = true;
        this.render_style(style_args);
    }

    if(props['outline_style']){
        this.style_data = props['outline_style']
        this.inline_style = false;
        this.render_style(style_args);
    }


    const TAGS_TO_IGNORE = ['inline_style','outline_style','style_args']
    for (const key in props){
        if(TAGS_TO_IGNORE.includes(key)){
            continue;
        }

        this.set_prop(key,props[key])
    }

}

/**
 * @param {string || function } content
 * @param {Element404Props } props
 * */
Element404.prototype.generate_component_reference=function(content,props){

    this.generator = (args)=>{
        this.root.innerHTML = "";
        let old_root = this.father.root;
        this.father.root = this.root;
        this.set_props(props)

        let formatted_content =  content;

        if(formatted_content instanceof  Function){
            formatted_content = content(this,args);
        }

        if(formatted_content !== undefined){
            formatted_content = String(formatted_content);
        }

        if(formatted_content){
            let node = document.createTextNode(formatted_content)
            this.root.appendChild(node)
        }

        this.father.root = old_root;
    }

    this.generator({});

}

/**
 * @param {string || undefined} tag
 * @param {string || function || undefined} content
 * @param {Element404Props || undefined} props
 * @returns {Element404}
 * */
Element404.prototype.sub_component=function( tag,content,props){

    let sub_element = new Element404();
    let tag_not_exist = tag === undefined || tag === null
    if(tag_not_exist){
        let formatted_content = Element404Extras.get_func_result(content)
        let node = document.createTextNode(formatted_content)
        this.root.appendChild(node);
        sub_element.sub_element(this,node);
        return sub_element;
    }

    let domElement = document.createElement(tag)
    sub_element.sub_element(this,domElement);
    sub_element.generate_component_reference(content,props)
    this.root.appendChild(domElement)


    return sub_element
}



/**
 * 
 * @param {string || undefined} tag The tag of element
 * @param {function || string} content the internal content
 * @param {Element404Props || undefined} props The object props
 * @returns {Element404}
 */
Element404.prototype.create=function(tag =undefined,content =undefined,props=undefined){

   return  this.sub_component(tag,content,props)
    
}
