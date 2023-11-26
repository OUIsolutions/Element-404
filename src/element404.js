




class Element404{
    constructor(){
        this.root = undefined      
        this.started = false  

    }
    
    private_set_prop(element,key,value){

        
        if(typeof(value) === 'function'){

            let callback = ()=>{
                value(element)            
                this.generator()
                this.target.innerHTML= ''
                this.target.appendChild(this.root)
            }

            element.addEventListener(key,callback)
            return
        }

        
        element.setAttribute(key,value)
    }

    
    
    private_set_props(element,props){
        if(props === null || props === undefined){
            return
        }    

        if(typeof(props) !== 'object'){
            throw TypeError("props of element: "+ this.root +" should be an object")
        }

        for (const key in props){
            this.private_set_prop(element,key,props[key])
        }

    }
 

    private_generate_component_reference(element,props,content){
        this.private_set_props(element,props)


        let is_a_function = typeof(content) === 'function'
        
        if(is_a_function){
           let generated_content = content()
           if(generated_content){
                let node = document.createTextNode(generated_content)
                element.appendChild(node)
           }
        }

        
        if(is_a_function === false && content){
            let node = document.createTextNode(content)
            element.appendChild(node)
        }
    }

    private_sub_component(tag,props,content){

        if(tag === null){
            let node = document.createTextNode(content)
            this.root.appendChild(node)
            return
        }

        let element = document.createElement(tag)

        this.root.appendChild(element)

        this.private_generate_component_reference(element,props,content)
    }


    /**
     * @param {string} tag - The tag of the element
     * @param {{}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    create(tag,props,content){

        if (this.started === false){

            this.generator = () => {         
                
                let element = document.createElement(tag)
                this.root = element
                this.private_generate_component_reference(element,props,content)
            } 
            this.started = true
            return
        }


        this.private_sub_component(tag,props,content)
        
    }   

    /**
     * @param {{'click':function, 'focusout':function}} props -The props of elemment
     */
    input(props){
        this.create('input',props,null)
    }


    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    div(props,content){
        this.create('div',props,content)
    }


    /**
     * @param {function | string | number} content - The content of the element
     */
    text(message){
        this.create(null,null,message)
    }

    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    button(props,content){
        this.create('button',props,content)
    }

    br(){
        this.create('br')
    }



    /**
     * @param {Element} target - The target you want to render
     */
    render(target){
        this.target = target
        this.target.innerHTML = ''
        this.generator()
        target.appendChild(this.root)
    }
}
