




export class Element404{
    constructor(){
        this.root = undefined        
        this.targets = []
    }

    private_render_targets(){
        this.targets.forEach(target=>{
            target.innerHTML = ''
            target.appendChild(this.root)

        })
    }

    
    private_set_prop(element,key,value){

        
        if(typeof(value) === 'function'){

            let callback = ()=>{
                    value(element)
            
                    this.private_render_targets()
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
    

    create(tag,props,content){
        
        if(typeof(tag) !== 'string'){
            throw TypeError(tag +"its not an string")
        }



        let element = document.createElement(tag)

        let first_call = this.root === undefined

        if (first_call){
            this.root = element
            this.generate_callback = ()=>{

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
        }


        if(first_call ==false){
            this.root.appendChild(element)
        }
        
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

    div(props,content){
        this.create('div',props,content)
    }

    br(){
        this.create('br')
    }


    render(target){
        let not_inside_targets = this.targets.includes(target) ===false
        if(not_inside_targets){
            this.targets.push(target)
        }

        target.innerHTML = ''
        target.appendChild(this.root)
    }
}
