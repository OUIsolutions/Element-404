

/**
 * @param {string} tag - The tag of the element
 * @param {{}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.create=function(tag,props,content){


    if (this.started === false){

        this.generator = () => {         
            
            let element = document.createElement(tag)
            this.root = element
            this.generate_component_reference(this,element,props,content)
        } 
        this.started = true
        return
    }


    this.sub_component(this,tag,props,content)
    
}   



/**
 * @param {Element} target - The target you want to render
*/
Element404.prototype.render= function(target){
    if(target){
        this.target = target
    }

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}

