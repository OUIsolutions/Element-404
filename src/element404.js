




class Element404{
    constructor(){
        this.root = undefined      
        this.started = false  

    }

        

    private_generate_component_reference(element,props,content){
        Element404Internal.set_props(this,element,props)

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
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    p(props,content){
        this.create('p',props,content)
    }



    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h1(props,content){
        this.create('h1',props,content)
    }



    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h2(props,content){
        this.create('h2',props,content)
    }


    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h3(props,content){
        this.create('h3',props,content)
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
