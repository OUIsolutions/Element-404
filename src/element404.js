




class Element404{
    constructor(){
        this.root = undefined      
        this.started = false  

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
                Element404Internal.generate_component_reference(this,element,props,content)
            } 
            this.started = true
            return
        }


        Element404Internal.sub_component(this,tag,props,content)
        
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
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h4(props,content){
        this.create('h4',props,content)
    }

    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h5(props,content){
        this.create('h5',props,content)
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
        if(target){
            this.target = target
        }
        
        this.target.innerHTML = ''
        this.generator()
        target.appendChild(this.root)
    }
}
