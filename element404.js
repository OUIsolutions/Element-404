




export class Element404{
    constructor(){
        this.root = undefined
    }


    private_set_props(props){
        if(props === null || props === undefined){
            return
        }    
        if(typeof(props) !== 'object'){
            throw TypeError("props of element:"+ this.root +"should be an object")
        }

        for (const key in props){
            this.root.setAttribute(key,props[key])
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
        target.appendChild(this.root)
    }
}
