




export class Element404{
    constructor(){
        this.root = undefined        
    }

    private_set_prop(element,key,value){

        
        if(typeof(value) === 'function'){

            function callback(){
                    value(element)
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
        
        this.private_set_props(element,props)


        let is_a_function = typeof(content) === 'function'
        
        if(is_a_function){
            content()
        }

        
        if(is_a_function === false && content){
            let node = document.createTextNode(content)
            element.appendChild(node)
        }
        
    }   

    div(props,content){
        this.create('div',props,content)
    }



    render(target){
        target.appendChild(this.root)
    }
}
