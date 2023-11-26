




export class Element404{
    constructor(){
        this.root = undefined        
    }

    private_set_prop(key,value){
        if(typeof(value) === 'function'){
            this.root.addEventListener(key,value)
            return
        }
        this.root.setAttribute(key,value)
    }


    
    private_set_props(props){
        if(props === null || props === undefined){
            return
        }    
        if(typeof(props) !== 'object'){
            throw TypeError("props of element:"+ this.root +"should be an object")
        }

        for (const key in props){
            this.private_set_prop(key,props[key])
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


        let is_a_function = typeof(content) === 'function'
        
        if(is_a_function){
            content()
        }

        if(is_a_function === false){
            let node = document.createTextNode(content)
            element.appendChild(node)
        }
        
    }   

    div(props,content){
        this.create(props,content)
    }
    


    render(target){
        target.appendChild(this.root)
    }
}
