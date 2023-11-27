
let  Element404Internal ={
    



    /**
     * @param {Element} domElement -The dom element
    * @param {{}} value - The value of the style tag to iterate
    */
    create_object_style(domElement,style_value){
        let style_string = ""
        for (const key in style_value){
            style_string+= `${key}:${style_value[key]};`
        }
        console.log(style_string)
        domElement.setAttribute('style',style_string)
    },

    
    
    /**
     * @param {Element404} element - The this object 
     * @param {Element} domElement -The dom element
     * @param {string} key - The key of the prop
     * @param {function | string | {}} value - The value of the element (objects are only vallid for stye tag)
     */
    set_prop(element, domElement,key,value){
         
        if(typeof(value) === 'function'){

            let callback = ()=>{
                value(element)            
                element.generator()
                element.target.innerHTML= ''
                element.target.appendChild(element.root)
            }

            domElement.addEventListener(key,callback)
            return
        }

        if(key === 'style' && typeof(value) == 'object'){

            this.create_object_style(domElement,value)
            return
        }

        
        domElement.setAttribute(key,value)
    },

    
    /**
     * @param {Element404} element - The this object 
     * @param {Element} domElement -The dom element
     * @param {{}} props - The props of element
     */
    set_props(element,domElement,props){
        if(props === null || props === undefined){
            return
        }    

        if(typeof(props) !== 'object'){
            throw TypeError("props of element: "+ element.root +" should be an object")
        }

        for (const key in props){
            this.set_prop(element,domElement, key,props[key])
        }

    },
    

    /**
     * @param {Element404} element - The this object 
     * @param {Element} domElement -The dom element
     * @param {{}} props - The props of element
     * @param {function | any} content - the content to render
     */
    generate_component_reference(element,domElement,props,content){
        Element404Internal.set_props(this,element,props)

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
    },



    /**
     * @param {Element404} element - The this object 
     * @param {string} tag - The tag of the element
     * @param {{}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */

    sub_component(element, tag,props,content){

        if(tag === null){
            let node = document.createTextNode(content)
            element.root.appendChild(node)
            return
        }

        let domElement = document.createElement(tag)

        element.root.appendChild(element)

        this.generate_component_reference(element,domElement,props,content)
        
    }
}