

class Element404Base{

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
     * @param {Element} target - The target you want to render
     */
    render(target){
        if(target){
            this.target = target
        }

        this.target.innerHTML = ''
        this.generator()
        this.target.appendChild(this.root)
    }

}