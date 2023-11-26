



export class Element404{
    constructor(){
        this.root = undefined
    }

    create(tag,props,content){
        let element = document.createElement(tag)
        
        if (this.root == undefined){
            this.root = element
        }
        if(typeof(content) === 'string'){
            let node = document.createTextNode(content)
            element.appendChild(node)
        }
            
    }   

    render(target){

        console.log(this.root)
    }
}
