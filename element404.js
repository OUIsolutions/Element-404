




export class Element404{
    constructor(){
        this.root = undefined
    }


    private_set_props(element,props){
        if(props == null){
            return
        }    
        
    }
    

    create(tag,props,content){
        let element = document.createElement(tag)

        let first_call = this.root === undefined

        if (first_call){
            this.root = element
        }
        if(first_call ==false){
            this.root.appendChild(element)
        }
        
        this.private_set_props(props)


        let callable = typeof(content) === 'function'
        if(callable){
            content()
        }

        if(callable === false){
            let node = document.createTextNode(content)
            element.appendChild(node)
        }
        
    }   


    render(target){

        console.log(this.root)
    }
}
