
let  Element404Internal ={
    

    
    
    /**
     * @param {Element404} element - The this object 
     * @param {Element} domElement -The dom element
     * @param {string} key - The key of the prop
     * @param {function | string | object} value - The value of the element (objects are only vallid for stye tag)
     */
    set_prop(element, domElement,key,value){
         
        if(typeof(value) === 'function'){

            let callback = ()=>{
                value(element)            
                this.generator()
                this.target.innerHTML= ''
                this.target.appendChild(this.root)
            }

            domElement.addEventListener(key,callback)
            return
        }

        
        domElement.setAttribute(key,value)
    }

    
}