


/**
* @param {Element} domElement -The dom element
* @param {{}} value - The value of the style tag to iterate
*/
Element404.prototype.create_object_style = function(domElement,style_value){
    let style_string = ""
    for (const key in style_value){
        style_string+= `${key}:${style_value[key]};`
    }
    console.log(style_string)
    domElement.setAttribute('style',style_string)
}



/**
 * @param {Element} domElement -The dom element
 * @param {string} key - The key of the prop
 * @param {function | string | {}} value - The value of the element (objects are only vallid for stye tag)
 */
Element404.prototype.set_prop = function(domElement,key,value){
        
    if(typeof(value) === 'function'){

        let callback = ()=>{
            value(domElement)            
            this.render()
        }

        domElement.addEventListener(key,callback)
        return
    }

    if(key === 'style' && typeof(value) == 'object'){

        this.create_object_style(domElement,value)
        return
    }

    
    domElement.setAttribute(key,value)
}


/**
 * @param {Element} domElement -The dom element
 * @param {{}} props - The props of element
 */
Element404.prototype.set_props = function(domElement,props){
    if(props === null || props === undefined){
        return
    }    

    if(typeof(props) !== 'object'){
        throw TypeError("props of element: "+ this.root +" should be an object")
    }

    for (const key in props){
        this.set_prop(domElement, key,props[key])
    }

}


/**
 * @param {Element} domElement -The dom element
 * @param {{}} props - The props of element
 * @param {function | any} content - the content to render
 */
Element404.prototype.generate_component_reference=function(domElement,props,content){
    this.set_props(domElement,props)

    let is_a_function = typeof(content) === 'function'
    
    if(is_a_function){
        let generated_content = content()
        if(generated_content){
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
 * @param {string} tag - The tag of the element
 * @param {{}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */

Element404.prototype.sub_component=function( tag,props,content){

    if(tag === null){
        let node = document.createTextNode(content)
        Element404.prototype.root.appendChild(node)
        return
    }

    let domElement = document.createElement(tag)
    this.root.appendChild(domElement)
    this.generate_component_reference(domElement,props,content)
    
}
