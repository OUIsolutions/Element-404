



/** @param {HTMLElement} domElement 
 * @param {string} key
 * @param {string|function} value
*/
Element404.prototype.set_prop = function(domElement,key,value){

    if(key === 'style'){
        let create_style = Element404Style.create_object_style(value);
        domElement.setAttribute('style',create_style)
        return
    }


    if(value instanceof Function){

        let callback = (event)=>{

            if(this.locked && key.includes('notLock_') === false){
                return;
            }
            
            value(domElement,event)
            if(key.includes('render_')){
                this.render()
            }

        }

        const  TAGS  = ['render_','notLock_'];
        let formatted_key = key
        for (let tag of TAGS){
            formatted_key = formatted_key.replace(tag,'')
        }

        domElement.addEventListener(formatted_key,callback)
        return
    }

    domElement.setAttribute(key,value)
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
 * @param {HTMLElement} domElement
 * @param {Element404Props || undefined } props
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
 * @param {Element404Props } props
 * */
Element404.prototype.generate_component_reference=function(domElement,content,props){
    this.set_props(domElement,props)


    let formatted_content = Element404Extras.get_func_result(content)

    if(formatted_content){
        let node = document.createTextNode(formatted_content)
        domElement.appendChild(node)
    }


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
 * @param {string || undefined} tag The tag of element
 * @param {function || string} content the internal content
 * @param {Element404Props || undefined} props The object props
 * @returns {Element404}
 */
Element404.prototype.create=function(tag =undefined,content =undefined,props=undefined){

   return  this.sub_component(tag,content,props)
    
}
