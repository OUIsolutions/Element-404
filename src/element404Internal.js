
let  Element404Internal ={
    
    /**
     * @param {Element} domElement -The dom element
    * @param {{}} value - The value of the style tag to iterate
    */
    create_object_style(domElement,style_value){
        for (const key in style_value){
            domElement.style+= `${key}=${style_value[key]};`
        }
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

        if(key === 'style' && typeof(value) == 'Object'){
            this.create_object_style(element,value)
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

    }

}