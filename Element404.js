
 function Element404(){


        /** @type {Element404} */
        this.father = null;
        
        /** @type {boolean} */
        this.child = false;


        /** @type {boolean} */
        this.locked = false;


        /** @type {DocumentFragment} */
        this.root;
        
        /** @type {function} */
        this.generator;

        /** @type {HTMLElement} */  
        this.target;
 }




/**
 * @param {function} generator 
 * @param {HTMLElement} target
 */
Element404.prototype.rootConstructor = function(generator,target){
     this.root = document.createDocumentFragment();
     this.generator = ()=>{generator(this)}
     this.target = target;
}

Element404.prototype.sub_element = function(father,root){
     this.father = father;
     this.root = root;
     this.child = true;     
} 


/**
 * @param {function} generator
 * @param {HTMLElement} target
 */
function  createElement404(generator,target){
     let createdd =  new Element404();
     createdd.rootConstructor(generator,target);
     return createdd;
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

            if(this.locked && key.includes('unlockable_') === false){
                return;
            }
            
            value(domElement)
            if(key.includes('render_')){
                this.render()
            }

        }
        let tags  = ['render_','unlockable_'];
        let formated_key = key
        for (let tag of tags){
            formated_key = formated_key.replace(tag,'')
        }
        domElement.addEventListener(formated_key,callback)
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
 * @returns {Element404}
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

    let sub_element = new Element404();
    sub_element.sub_element(this,domElement);
    return sub_element
}

/**
 * 
 * @param {string } tag The tag of element
 * @param {object} props The object props
 * @param {fuction | string} content the internal content
 */
Element404.prototype.create=function(tag,props,content){

   return  this.sub_component(tag,props,content)
    
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




Element404.prototype.lock=function(){

    this.locked = true;
    
}

Element404.prototype.unlock=function(){
        this.locked = false;        
}









/**
 * Creates a form
 * @param {object} props The object props
 * @returns {Element404}

 * */
Element404.prototype.input=function(props){
    return this.create('input',props,null)
}


/**
 * Creates a Div
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.div=function(props,content){
    return this.create('div',props,content)
}


/**
 * Creates an paragraph
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}    
 */
Element404.prototype.p=function(props,content){
    return this.create('p',props,content)
}


/**
 * Creates a h1
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}s
 */
Element404.prototype.h1=function(props,content){
    return this.create('h1',props,content)
}



/**
 * Creates a g2
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h2=function(props,content){
    return this.create('h2',props,content)
}



/**
 * Creates a H3
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h3=function(props,content){
   return  this.create('h3',props,content)
}
/**
 * Creates an H4
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h4=function(props,content){
   return  this.create('h4',props,content)
}


/**
 * Creates an H5
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h5=function(props,content){
    return this.create('h5',props,content)
}

/**
 * Creates an select
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.select=function(props,content){
   return  this.create('select',props,content)
}

/**
 * Creates an option
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.option=function(props,content){
  return   this.create('option',props,content)
}


/**
 * Creates an table
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.table=function(props,content){
   return  this.create('table',props,content)
}

/**
 * Creates an td
 * @param {object} props The object props
 * @param {boolean} content the internal content
 * @returns {Element404}
 */
Element404.prototype.td=function(props,content){
   return  this.create('td',props,content)
}

/**
 * Creates an tr
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */

Element404.prototype.tr=function(props,content){
    return this.create('tr',props,content)
}


/**
 * Creates an th
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */

Element404.prototype.th=function(props,content){
    return this.create('th',props,content)
}

/**
 * Creates an H3
 * @param {string} message The object props
 * @returns {Element404}
 */
Element404.prototype.text=function(message){
   return  this.create('text',null,message)
}

/**
 * Creates a button
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.button=function(props,content){
    return this.create('button',props,content)
}
/**
 * Creates a br
 * @returns {Element404}
 */
Element404.prototype.br=function(){
  return this.create('br',null,null);
}



/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 */
Element404.prototype.stateInput= function(state,name,props) {

    let old_value = state[name];

    let formated_props = {

        unlockable_keyup:(input)=>{
            if(this.locked){
                this.render();
                return;
            }

            state[name] = input.value
        },

        focusout:(input)=>{
            this.render();
        }

        
        
    }

    if(old_value){
        formated_props.value = old_value
    }
    for(let key in props){
            formated_props[key] = props[key];
    }

    this.input(formated_props);

}


/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {object} props
 * @param {string} content
 * @param {string} tag
 */
Element404.prototype.stateIncreaser = function(state,name,value,props,content,tag='button'){

    let formated_props = {
        render_click:()=>{
            let old_value = Number(state[name]);
            if(!old_value){
                old_value = 0;
            }
            state[name] = old_value+value;
            this.render();
        }
    }
    for(let key in props){
        formated_props[key] = props[key];
    }
    this.create(tag,formated_props,content);

}

/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {object} props
 * @param {string} content
 * @param {string} tag
 */
Element404.prototype.stateDecreaser = function(state,name,value,props,content,tag='button'){

    let formated_props = {
        render_click:()=>{
            let old_value = Number(state[name]);
            if(!old_value){
                old_value = 0;
            }
            state[name] = old_value-value;
            this.render();
        }
    }
    for(let key in props){
        formated_props[key] = props[key];
    }
    this.create(tag,formated_props,content);


}

/**
* @param {object} state
* @param {string} name
* @param {Array | Object} options
* @param {object} props
*/
Element404.prototype.stateSelect = function(state,name,options,props){

    let formated_props = {
        unlockable_render_change:(select)=>{
            if(this.locked){
                return;
            }
            state[name] = select.value;
           
        }

    }
    
    for(let key in props){
        formated_props[key] = props[key];
    }

    
    if(options.constructor.name === 'Object'){
        this.select(formated_props,()=>{
            for(let key in options){
                if(key === state[name]){
                    this.option({value:key,selected:true},options[key]);
                    continue;
                }
                this.option({value:key},options[key]);
            }
        });        
    }
    

    if(options.constructor.name === 'Array'){
        this.select(formated_props,()=>{
            options.forEach((option)=>{
                if(option === state[name]){
                    this.option({value:option,selected:true},option);
                    return;
                }
                this.option({value:option},option);
            });
        });        
    }

}


Element404.prototype.stateSetter = function(
    state,
    name,
    value,
    seted_props,
    unseted_props,
    content,
    tag='button'){


    let old_value = state[name];

    let formated_props = {
        render_click:()=>{
            
            state[name] = value;
            this.render();
        }
    }
    
    if(old_value === value){
        for(let key in seted_props){
            formated_props[key] = seted_props[key];
        }
    }
    
    if (old_value !== value){
        for(let key in unseted_props){
            formated_props[key] = unseted_props[key];
        }
    }
    
    this.create(tag,formated_props,content);

}

