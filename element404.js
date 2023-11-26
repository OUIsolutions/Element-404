




export class Element404{
    constructor(){
        this.root = undefined      
        this.started = false  
        this.targets = []
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
 


    private_sub_component(tag,props,content){
        let element = document.createElement(tag)

        this.root.appendChild(element)

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

    create(tag,props,content){
   
        if(typeof(tag) !== 'string'){
            throw TypeError(tag +"its not an string")
        }

        if (this.started === false){

            this.generator = () => {
                let element = document.createElement(tag)
                this.root = element
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
            this.started = true
            return
        }


        this.private_sub_component(tag,props,content)
        
    }   

    div(props,content){
        this.create('div',props,content)
    }
    button(props,content){
        this.create('button',props,content)
    }

    br(){
        this.create('br')
    }


    render(target){
        this.target = target
        target.innerHTML = ''
        this.generator()
        target.appendChild(this.root)
    }
}
