



export class Element404{
    constructor(){
        this.root = undefined
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
