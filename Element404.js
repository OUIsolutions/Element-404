
 function Element404(){

        
        /** @type {boolean} */
        this.child = false;


        /** @type {boolean} */
        this.locked = false;


 }




/**
 * @param {function} generator 
 * @param {HTMLElement} target
 * @returns {Element404}
 */
Element404.prototype.rootConstructor = function(generator,target){
    /** @type {DocumentFragment || HTMLElement} */
    this.root = document.createDocumentFragment();
    /** @type {function} */
    this.generator = ()=>{generator(this)}
    /** @type {HTMLElement} */
    this.target = target;
    return this;
}

 /**
  * @param {Element404} father
  * @param {DocumentFragment || HTMLElement ||  Text} root
  * @returns {Element404}
  */
Element404.prototype.sub_element = function(father,root){
    /** @type {Element404} */
    this.father = father;
    /** @type {DocumentFragment || HTMLElement ||  Text} */
    this.root = root;
     this.child = true;
     return this;
} 


/**
 * @param {function} generator
 * @param {HTMLElement} target
 * @returns {Element404}
 */
function  createElement404(generator,target){
     let created =  new Element404();
     created.rootConstructor(generator,target);
     return created;
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

            if(this.locked && key.includes('notLock_') === false){
                return;
            }
            
            value(domElement)
            if(key.includes('render_')){
                this.render()
            }

        }

        let tags  = ['render_','notLock_'];
        let formatted_key = key
        for (let tag of tags){
            formatted_key = formatted_key.replace(tag,'')
        }
        domElement.addEventListener(formatted_key,callback)
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
 * @param {object } props
 *  */
Element404.prototype.set_props = function(domElement,props){
    if(props === null || props === undefined){
        return
    }    



    for (const key in props){
        this.set_prop(domElement, key,props[key])
    }

}

/**
 * @param {HTMLElement} domElement
 * @param {string || function } content
 * @param {object } props
 * */
Element404.prototype.generate_component_reference=function(domElement,content,props){
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
 * @param {string || null} tag
 * @param {string || function || null} content
 * @param {object || null} props
 * @returns {Element404}
 * */
Element404.prototype.sub_component=function( tag,content,props){
    let sub_element = new Element404();

    if(tag === null){
        let node = document.createTextNode(content)
        this.root.appendChild(node);
        sub_element.sub_element(this,node);
        return sub_element;
    }

    let domElement = document.createElement(tag)
    this.root.appendChild(domElement)
    let old_root =this.root
    this.root = domElement
    this.generate_component_reference(domElement,content,props)
    this.root = old_root


    sub_element.sub_element(this,domElement);
    return sub_element
}

/**
 * 
 * @param {string || null} tag The tag of element
 * @param {function || string} content the internal content
 * @param {object} props The object props
 * @returns {Element404}
 */
Element404.prototype.create=function(tag =null,content =null,props=null){

   return  this.sub_component(tag,content,props)
    
}




Element404.prototype.render= function(){

    if(this.child){
        this.father.render();
        return;
    }

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
 * @param {object } props The object props
 * @returns {Element404}
 * */
Element404.prototype.input=function(props=null){
    return this.create('input',null,props)
}


/**
 * Creates a function
 * @param {function || string || null} content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.div=function(content=null,props=null){
    return this.create('div',content,props)
}


/**
 * Creates an paragraph
 * @param {function || string } content the internal content
 * @param {object} props The object props
 * @returns {Element404}
 */
Element404.prototype.p=function(content,props=null){
    return this.create('p',content,props)
}


/**
 * Creates a h1
 * @param {function || string } content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.h1=function(content,props=null){
    return this.create('h1',content,props)
}



/**
 * Creates a h2
 * @param {function || string} content the internal content
 * @param {object} props The object props
 * @returns {Element404}
 */
Element404.prototype.h2=function(content,props=null){
    return this.create('h2',content,props)
}



/**
 * Creates an H3
 * @param {function | string} content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.h3=function(content,props=null){
   return  this.create('h3',content,props)
}
/**
 * Creates an H4
 * @param {function | string} content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.h4=function(content,props=null){
   return  this.create('h4',content,props)
}


/**
 * Creates a H5
 * @param {object } props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h5=function(content,props=null){
    return this.create('h5',content,props)
}

/**
 * Creates an select
 * @param {object } props The object props
 * @param {function} content the internal content
 * @returns {Element404}
 */
Element404.prototype.select=function(content,props=null){
   return  this.create('select',content,props)
}

/**
 * Creates an option
 * @param {function || string} content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.option=function(content,props=null){
  return  this.create('option',content,props)
}


/**
 * Creates a table
 * @param {function | string} content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.table=function(content,props){
   return  this.create('table',content,props)
}

/**
 * Creates a td
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.td=function(content,props=null){
   return  this.create('td',content,props)
}

/**
 * Creates a tr
 * @param {function | string} content the internal content
 * @param {object} props The object props
 * @returns {Element404}
 */
Element404.prototype.tr=function(content,props=null){
    return this.create('tr',content,props)
}


/**
 * Creates a th
 * @param {function | string} content the internal content
 * @param {object} props The object props
 * @returns {Element404}
 */
Element404.prototype.th=function(content,props=null){
    return this.create('th',content,props)
}

/**
 * Creates an H3
 * @param {string} message The object props
 * @returns {Element404}
 */
Element404.prototype.text=function(message){
   return  this.create('text',message)
}

/**
 * Creates a button
 * @param {function | string} content the internal content
 * @param {object } props The object props
 * @returns {Element404}
 */
Element404.prototype.button=function(content,props=null){
    return this.create('button',content,props)
}
/**
 * Creates a br
 * @returns {Element404}
 */
Element404.prototype.br=function(){
  return this.create('br');
}



/**
 * @param {object} state
 * @param {string} name
 * @param {object} props
 */
Element404.prototype.stateInput= function(state,name,props=null) {

    let old_value = state[name];

    let formatted_props = {

        "notLock_keyup":(input)=>{
            if(this.locked){
                this.render();
                return;
            }

            state[name] = input.value
        },

        "focusout":()=>{
            this.render();
        }

        
        
    }

    if(old_value){
        formatted_props.value = old_value
    }
    for(let key in props){
            formatted_props[key] = props[key];
    }

    this.input(formatted_props);

}


/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {string} tag
 * @param {object} props
 */
Element404.prototype.stateIncrease = function(state, name, value, content, tag='button',props=null){

    let formatted_props = {
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
        formatted_props[key] = props[key];
    }
    this.create(tag,content,formatted_props);

}

/**
 * @param {object} state
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {string} tag
 * @param {object} props
 */
Element404.prototype.stateDecrease = function(state, name, value, content,  tag='button',props=null){

    let formatted_props = {
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
        formatted_props[key] = props[key];
    }
    this.create(tag,content,formatted_props);


}

/**
* @param {object} state
* @param {string} name
* @param {Array<string> | Object} options
* @param {object} props
*/
Element404.prototype.stateSelect = function(state,name,options,props=null){

    let formatted_props = {
        "notLock_render_change":(select)=>{
            if(this.locked){
                return;
            }

            state[name] = select.value;
           
        }

    }
    
    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.select(()=> {
            if (options.constructor.name === 'Object') {

                for (let key in options) {
                    if (key === state[name]) {
                        this.option(options[key], {"value": key, "selected": true});
                        continue;
                    }
                    this.option(options[key], {"value": key});
                }
            }

            if (options.constructor.name === 'Array') {
                options.forEach((option) => {
                    if (option === state[name]) {
                        this.option(option, {"value": option, "selected": true});
                        return;
                    }
                    this.option(option, {"value": option});
                }, formatted_props);

            }
        }

    ,formatted_props);
}


Element404.prototype.stateSetter = function(
    state,
    name,
    value,
    selected_value,
    unselected_value
    ){


    let old_value = state[name];

    let formatted_props = {
        render_click:()=>{
            
            state[name] = value;
            this.render();
        }
    }
    let is_selected = old_value === value;
    /**@type {object}*/
    let corresponded_value= is_selected ? selected_value: unselected_value;
    let props = corresponded_value.props;

    /**@type {string}*/
    let tag = corresponded_value.tag ? corresponded_value.tag: "button";
    let content = corresponded_value.content;

    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.create(tag,content,formatted_props);


}

