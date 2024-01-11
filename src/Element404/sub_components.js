



/**
 * @param {string} key
 * @param {string | function || object} value
 * @return {Element404}
*/
Element404.prototype.set_prop = function(key,value){

    if(value instanceof Function){
        let callback = (event)=>{

            if(this.is_locked() && key.includes(ELEMENT_404_NOT_LOCK) === false){
                return;
            }
            value(this.mutable_domElement,event)
            if(key.includes(ELEMENT_404_FULL_RENDER)){

                this.render({root_render:true})
            }
            if(key.includes(ELEMENT_404_SMART_RENDER)){
                this.smart_render();
            }

        }

        let formatted_key = key
        for (let tag of ELEMENT_404_RENDER_TAGS){
            formatted_key = formatted_key.replace(tag,ELEMENT_404_EMPTY)
        }

        this.mutable_domElement.addEventListener(formatted_key,callback)
        return this;
    }

    this.mutable_domElement.setAttribute(key,value)
    return  this;
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

    let style_args = props[ELEMENT_404_STYLE_ARGS];

    if(!style_args){
        style_args = {};
    }

    if(props[ELEMENT_404_INLINE_STYLE]){
        this.style_data = props[ELEMENT_404_INLINE_STYLE]
        this.is_inline_style = true;
        this.render_style(style_args);
    }

    if(props[ELEMENT_404_OUTLINE_STYLE]){
        this.style_data = props[ELEMENT_404_OUTLINE_STYLE]
        this.is_inline_style = false;
        this.render_style(style_args);
    }


    for (const key in props){
        if(ELEMENT_404_STYLE_TAGS.includes(key)){
            continue;
        }

        this.set_prop(key,props[key])
    }

}

/**
 * @param {string || function } content
 * @param {Element404Props } props
 * */
Element404.prototype.create_generator=function(content, props=undefined){

    this.generator = (args)=>{
        this.mutable_domElement.innerHTML = ELEMENT_404_EMPTY;
        let father_domElement = this.father.mutable_domElement;
        let father_storedSubElements = this.father.stored_sub_elements;
        this.father.mutable_domElement = this.mutable_domElement;
        this.father.stored_sub_elements = this.stored_sub_elements;

        if(props){
            this.set_props(props)
        }

        let formatted_content =  content;

        if(formatted_content instanceof  Function){
            let execution_args = args.args;
            if(!execution_args){
                execution_args = {};
            }
            formatted_content = content(this,execution_args);
        }

        if(formatted_content !== undefined && formatted_content !== null){
            formatted_content = String(formatted_content);
        }

        if(formatted_content){

            let node = document.createTextNode(formatted_content)

            this.mutable_domElement.appendChild(node)
        }

        this.father.stored_sub_elements = father_storedSubElements;
        this.father.mutable_domElement = father_domElement;
    }


}

/**
 * @param {Element404} father
 * @param {DocumentFragment || HTMLElement ||  Text} root
 * @returns {Element404}
 */
Element404.prototype.sub_element = function(father,root){
    /** @type {Element404} */
    this.father = father;
    /** @type {DocumentFragment || HTMLElement ||  Text}  */
    this.mutable_domElement = root;
    this.absolute_DomElement = root;
    this.child = true;
    this.state_full_render = this.father.state_full_render;
    this.allow_state_smart_render = this.father.allow_state_smart_render;
    this.stored_state = this.father.stored_state;
    return this;
}


/**
 * @param {string || undefined} tag
 * @param {string || Element404Generator || undefined} content
 * @param {Element404Props || undefined} props
 * @returns {Element404 || undefined}
 * */
Element404.prototype.sub_component=function( tag,content,props){

    let tag_not_exist = tag === undefined || tag === null
    if(tag_not_exist){
        let formatted_content = Element404Extras.get_func_result(content)
        let node = document.createTextNode(formatted_content)
        this.mutable_domElement.appendChild(node);
        return;
    }

    let sub_element = new Element404();

    let domElement = document.createElement(tag)
    sub_element.sub_element(this,domElement);
    sub_element.create_generator(content,props)
    sub_element.generator({});

    this.stored_sub_elements.push(sub_element);
    this.mutable_domElement.appendChild(domElement)


    return sub_element
}



/**
 * 
 * @param {string || undefined} tag The tag of element
 * @param {Element404Generator || string} content the internal content
 * @param {Element404Props || undefined} props The object props
 * @returns {Element404}
 */
Element404.prototype.create=function(tag =undefined,content =undefined,props=undefined){

   return  this.sub_component(tag,content,props)
    
}
