



Element404.prototype.create_object_style = function(domElement,style_value){
    let style_string = ""
    for (const key in style_value){
        style_string+= `${key}:${style_value[key]};`
    }
    console.log(style_string)
    domElement.setAttribute('style',style_string)
}




Element404.prototype.set_prop = function(domElement,key,value){
        
    if(typeof(value) === 'function'){

        let callback = ()=>{
            value(domElement)            
            this.render()
        }

        domElement.addEventListener(key,callback)
        return
    }

    if(key === 'style' && typeof(value) == 'object'){

        this.create_object_style(domElement,value)
        return
    }
    domElement.setAttribute(key,value)
}




Element404.prototype.set_props = function(domElement,props){
    if(props === null || props === undefined){
        return
    }    

    if(typeof(props) !== 'object'){
        throw TypeError("props of element: "+ this.root +" should be an object")
    }

    for (const key in props){
        this.set_prop(domElement, key,props[key])
    }

}

Element404.prototype.generate_component_reference=function(domElement,props,content){
    this.set_props(domElement,props)

    let is_a_function = typeof(content) === 'function'
    
    if(is_a_function){
        let generated_content = content()
        if(generated_content){
            let node = document.createTextNode(generated_content)
            domElement.appendChild(node)
        }
    }

    
    if(is_a_function === false && content){
        let node = document.createTextNode(content)
        domElement.appendChild(node)
    }
}


Element404.prototype.sub_component=function( tag,props,content){

    if(tag === null){
        let node = document.createTextNode(content)
        this.root.appendChild(node)
        return
    }

    let domElement = document.createElement(tag)
    this.root.appendChild(domElement)
    this.generate_component_reference(domElement,props,content)
    
}
