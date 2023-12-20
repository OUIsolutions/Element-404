
/**
 * @param {HTMLElement} domElement 
 * @param {object} style_value
 */
Element404.prototype.create_object_style = function(domElement,style_value){
    let style_string = ""
    for (const key in style_value){
        style_string+= `${key}:${style_value[key]};`
    }
    domElement.setAttribute('style',style_string)
}







/** @param {HTMLElement} domElement 
 * @param {string} key
 * @param {string|function} value
*/
Element404.prototype.set_prop = function(domElement,key,value){
        
    if(typeof(value) === 'function'){

        let callback = ()=>{

            if(this.locked && key.includes('notLock_') === false){
                return;
            }
            
            value(domElement)
            if(key.includes('render_')){
                this.render()
            }

        }

        let tags  = ['render_','notLock_'];
        let formatted_key = key
        for (let tag of tags){
            formatted_key = formatted_key.replace(tag,'')
        }



        domElement.addEventListener(formatted_key,callback)
        return
    }


    if(key === 'style' && typeof(value) == 'object'){

        this.create_object_style(domElement,value)
        return
    }
    domElement.setAttribute(key,value)
}



/**
 * @param {HTMLElement} domElement
 * @param {object } props
 *  */
Element404.prototype.set_props = function(domElement,props){
    if(props === null || props === undefined){
        return
    }    



    for (const key in props){
        this.set_prop(domElement, key,props[key])
    }

}

/**
 * @param {HTMLElement} domElement
 * @param {string || function } content
 * @param {object } props
 * */
Element404.prototype.generate_component_reference=function(domElement,content,props){
    this.set_props(domElement,props)

    let is_a_function = typeof(content) === 'function'
    
    if(is_a_function){
        let generated_content = content()
        if(typeof (generated_content) === 'string'){
            let node = document.createTextNode(generated_content)
            domElement.appendChild(node)
        }
    }

    
    if(is_a_function === false && content){
        let node = document.createTextNode(content)
        domElement.appendChild(node)
    }
}

/**
 * @param {string || null} tag
 * @param {string || function || null} content
 * @param {object || null} props
 * @returns {Element404}
 * */
Element404.prototype.sub_component=function( tag,content,props){
    let sub_element = new Element404();

    if(tag === null){
        let node = document.createTextNode(content)
        this.root.appendChild(node);
        sub_element.sub_element(this,node);
        return sub_element;
    }

    let domElement = document.createElement(tag)
    this.root.appendChild(domElement)
    let old_root =this.root
    this.root = domElement
    this.generate_component_reference(domElement,content,props)
    this.root = old_root


    sub_element.sub_element(this,domElement);
    return sub_element
}

/**
 * 
 * @param {string || null} tag The tag of element
 * @param {function || string} content the internal content
 * @param {object} props The object props
 * @returns {Element404}
 */
Element404.prototype.create=function(tag =null,content =null,props=null){

   return  this.sub_component(tag,content,props)
    
}
