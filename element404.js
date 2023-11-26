



export class Element404{
    constructor(){
        this.root = undefined
    }

    create(tag,props,caller){
        let element = document.createElement(tag)
        
        if (this.root == undefined){
            this.root = element
        }

        for (const key in props){
            let value = props[key]
            element.setAttribute(key,value)
        } 
        
            
    }   

    render(target){

        target.innerHTML = this.root
    }
}
