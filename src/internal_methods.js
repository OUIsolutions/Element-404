
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

            if(this.locked && key.includes('unlockable_') === false){
                return;
            }
            
            value(domElement)
            if(key.includes('render_')){
                this.render()
            }

        }
        let tags  = ['render_','unlockable_'];
        let formated_key = key
        for (let tag of tags){
            formated_key = formated_key.replace(tag,'')
        }
        domElement.addEventListener(formated_key,callback)
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
 * @param {object} props
 *  */

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
 * @param {HTMLElement} domElement
 * @param {object} props
 * @param {string|function} content
 * */

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
 * @param {string} tag
 * @param {object} props
 * @param {string|function} content
 * */
Element404.prototype.sub_component=function( tag,props,content){

    if(tag === null){
        let node = document.createTextNode(content)
        this.root.appendChild(node)
        return
    }
    let domElement = document.createElement(tag)
    this.root.appendChild(domElement)
    let old_root =this.root
    this.root = domElement
    this.generate_component_reference(domElement,props,content)
    this.root = old_root

}
