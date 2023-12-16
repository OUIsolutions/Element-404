/**
 * @param {function} generator 
 * @param {HTMLElement} target
 */
 function Element404(generator,target){
        /** @type {DocumentFragment} */
        this.root = document.createDocumentFragment();
        /** @type {function} */
        this.generator = ()=>{generator(this)}
        /** @type {boolean} */ 
        this.locked = false
        /** @type {HTMLElement} */  
        this.target = target;
 }

 
/**
 * @param {function} generator
 * @param {HTMLElement} target
 */
function  createElement404(generator,target){
     return new Element404(generator,target)
}



/**
 * @param {HTMLElement} domElement 
 * @param {object} style_value
 */
Element404.prototype.create_object_style = function(domElement,style_value){
    let style_string = ""
    for (const key in style_value){
        style_string+= `${key}:${style_value[key]};`
    }
    domElement.setAttribute('style',style_string)
}








/** @param {HTMLElement} domElement 
 * @param {string} key
 * @param {string|function} value
*/

Element404.prototype.set_prop = function(domElement,key,value){
        
    if(typeof(value) === 'function'){

        let callback = ()=>{
            if(this.locked){
                return;
            }

            value(domElement)
            if(key.startsWith('render_')){
                this.render()
            }

        }
        domElement.addEventListener(key.replace('render_',''),callback)
        return
    }


    if(key === 'style' && typeof(value) == 'object'){

        this.create_object_style(domElement,value)
        return
    }
    domElement.setAttribute(key,value)
}



/**
 * @param {HTMLElement} domElement
 * @param {object} props
 *  */

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

/**
 * @param {HTMLElement} domElement
 * @param {object} props
 * @param {string|function} content
 * */

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

/**
 * @param {string} tag
 * @param {object} props
 * @param {string|function} content
 * */
Element404.prototype.sub_component=function( tag,props,content){

    if(tag === null){
        let node = document.createTextNode(content)
        this.root.appendChild(node)
        return
    }
    let domElement = document.createElement(tag)
    this.root.appendChild(domElement)
    let old_root =this.root
    this.root = domElement
    this.generate_component_reference(domElement,props,content)
    this.root = old_root

}


/**
 * Returns the sum of all numbers passed to the function.
 * @param {string } tag The tag of element
 * @param {object} props The object props
 * @param {fuction | string} content the internal content
 */
Element404.prototype.create=function(tag,props,content){

    this.sub_component(tag,props,content)
    
}


/**
 * Returns the sum of all numbers passed to the function.
* @param {HTMLElement=} target The target to render
*/
Element404.prototype.render= function(){

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}




Element404.prototype.lock=function( ){
    this.locked = true
}


Element404.prototype.waitLock=function( ){
    while (this.locked){}
}

Element404.prototype.unlock=function( ){
    this.locked = false
}





/**
 * Creates a form
 * @param {object} props The object props
 * */
Element404.prototype.input=function(props){
    this.create('input',props,null)
}


/**
 * Creates a Div
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.div=function(props,content){
    this.create('div',props,content)
}


/**
 * Creates an paragraph
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.p=function(props,content){
    this.create('p',props,content)
}


/**
 * Creates a h1
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h1=function(props,content){
    this.create('h1',props,content)
}



/**
 * Creates a g2
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h2=function(props,content){
    this.create('h2',props,content)
}



/**
 * Creates a H3
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h3=function(props,content){
    this.create('h3',props,content)
}
/**
 * Creates an H4
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h4=function(props,content){
    this.create('h4',props,content)
}


/**
 * Creates an H5
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h5=function(props,content){
    this.create('h5',props,content)
}

/**
 * Creates an table
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.table=function(props,content){
    this.create('table',props,content)
}

/**
 * Creates an td
 * @param {object} props The object props
 * @param {boolean} content the internal content
 */
Element404.prototype.td=function(props,content){
    this.create('td',props,content)
}

/**
 * Creates an tr
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */

Element404.prototype.tr=function(props,content){
    this.create('tr',props,content)
}


/**
 * Creates an th
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */

Element404.prototype.th=function(props,content){
    this.create('th',props,content)
}

/**
 * Creates an H3
 * @param {string} message The object props
 */
Element404.prototype.text=function(message){
    this.create('text',null,message)
}

/**
 * Creates a button
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.button=function(props,content){
    this.create('button',props,content)
}
/**
 * Creates a br
 */
Element404.prototype.br=function(){
    this.create('br',null,null);
}



/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 */
Element404.prototype.stateInput= function(state,name,props) {


    let old_value = state[name];

    let formated_props = {
        keyup:(input)=>{
            state[name] = input.value
        }
        
    }

    if(old_value){
        formated_props.value = old_value
    }
    for(let key in props){
            formated_props[key] = props[key];
    }

    this.input(formated_props);
    return old_value;
}

