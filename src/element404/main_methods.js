


Element404.prototype.create=function(tag,props,content){


    if (this.started === false){

        this.generator = () => {         
            
            let element = document.createElement(tag)
            this.root = element
            this.generate_component_reference(element,props,content)
        } 
        this.started = true
        return
    }


    this.sub_component(tag,props,content)
    
}   


Element404.prototype.render= function(target){
    if(target){
        this.target = target
    }

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}

