
function Element404(){
        this.root = undefined      
        this.started = false  
}







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







Element404.prototype.input=function(props){
    this.create('input',props,null)
}


Element404.prototype.div=function(props,content){
    this.create('div',props,content)
}




Element404.prototype.p=function(props,content){
    this.create('p',props,content)
}


Element404.prototype.h1=function(props,content){
    this.create('h1',props,content)
}



Element404.prototype.h2=function(props,content){
    this.create('h2',props,content)
}



Element404.prototype.h3=function(props,content){
    this.create('h3',props,content)
}

Element404.prototype.h4=function(props,content){
    this.create('h4',props,content)
}

Element404.prototype.h5=function(props,content){
    this.create('h5',props,content)
}



Element404.prototype.text=function(message){
    this.create(null,null,message)
}


Element404.prototype.button=function(props,content){
    this.create('button',props,content)
}

Element404.prototype.br=function(){
    this.create('br')
}

