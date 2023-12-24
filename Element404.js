
/**@type {object}*/
let Element404Globals = {
    /**@type {Array<Resizible>}*/
    resize_elements:[]
}




class Element404Args{

    /**@type {Array<string>}*/
    used =[]

    /**
     * @param {Array || object} element
     * @param {Array || object} default_value
     * * */
    constructor(element,default_value) {

        this.element = element;
        if(element === undefined || element === null){
            this.element = default_value
        }
    }
    /**
     * @param {string || number} key_or_index
     * @param {any} default_value
     * @returns {any}
     * * */
    get(key_or_index,default_value){
        this.used.unshift(key_or_index);

        let value = this.element[key_or_index];
        if(value === undefined || value === null){
            return default_value;
        }
        return value
    }

    /**
     * @param {Array<string>} not_include
     * @returns {object}
     */
    get_all_except(not_include){

        let formatted = {};
        for(let key in this.element){
                if(not_include.includes(key)){
                    continue;
                }
                formatted[key] = this.element[key]
        }
        return formatted
    }

    /**
     * @returns {object}
     */
    get_no_listed(){
        return this.get_all_except(this.used);
    }
}


let Element404Extras = {


    /**
     * @param {any || function} element
     * @param {function } caster
     * @return {any}
     * */
    get_func_result(element,caster = undefined){
        if(typeof(element) === "function"){
            return this.get_func_result(element())
        }
        if(caster){
            return caster(element)
        }

        return  element
    }

}




/**
 * @typedef {object} Resizible
 * @property {any} style_value
 * @property {HTMLElement} domElement
 * */

window.onresize = function (){

    Element404Globals.resize_elements = Element404Globals.resize_elements.filter(element =>{
        return document.contains(element.domElement);
    })

    Element404Globals.resize_elements .forEach(element =>{
        let create_style = Element404Style.create_style(element.style_value);
        element.domElement.setAttribute('style',create_style)
    })

}



let Element404Style = {


    /**
     * @param {object} style_value
     * @return {string}
     * * */
    create_object_style(style_value){

        if(style_value['mergeIf']){
            let evaluation_result = Element404Extras.get_func_result(style_value['mergeIf'])
            if(!evaluation_result){
                return ""
            }
        }

        let style_string = ""

        for (const key in style_value){
            let value = Element404Extras.get_func_result(style_value[key])

            if(key === 'mergeif'){
                continue;
            }

            if(value.constructor.name === 'Object'){

                style_string+=this.create_object_style(value)
                continue;
            }

            style_string+=`${key}:${value};`
        }

        return style_string
    },



    /**
     * @param {string || Array || object} value
     * @returns {string}
     * */
    create_style(value){

            if(value instanceof  String){
                return value
            }

            if(value.constructor.name ===  'Object'){
                return this.create_object_style(value)
            }

            if(value.constructor.name === 'Array'){
                let style_string = ''
                for(let element of value){
                    style_string+=this.create_object_style(element)
                }
                return style_string
            }


    }
}


function Element404(){
    
        
        /** @type {boolean} */
        this.child = false;

        this.state_render = false;
        /** @type {number} */
        this.total_render_times = 0;

        /** @type {object} */
        this.stored_state = {};

        /** @type {boolean} */
        this.locked = false;


 }
/**
 * @typedef {function} Element404Generator
 * @param {Element404} main_interfface
 * */



/**
 * @param {Element404Generator} generator
 * @param {HTMLElement || DocumentFragment || Element404} target
 * @returns {Element404}
 */
Element404.prototype.rootConstructor = function(generator,target){


    /** @type {function} */
    this.generator = ()=>{generator(this)}

    /** @type {DocumentFragment || HTMLElement} */
    this.root = document.createDocumentFragment();



    //means its an component inside interfacce
    if(target instanceof  Element404){
        this.target = target.root

        return  this
    }


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
    /** @type {DocumentFragment || HTMLElement ||  Text}  */
    this.root = root;
    this.child = true;
    this.state_render = this.father.state_render;
    this.last_input = this.father.last_input;
    this.stored_state = this.father.stored_state;
     return this;
} 



/**
 * Creates a new Element 404
 * @param {Element404Generator} generator
 * @param {HTMLElement || DocumentFragment || Element404} target
 ** @returns {Element404}
 */
function  createElement404(generator,target=undefined){
     let created =  new Element404();
     created.rootConstructor(generator,target);
     return created;
}



Element404.prototype.lock=function(){

    this.locked = true;
    
}

Element404.prototype.unlock=function(){
        this.locked = false;        
}







Element404.prototype.clear = function (){
    this.root.innerHTML = ''
}

/**
 * Generate the tenderization
 * @param {HTMLElement || DocumentFragment || Element404}target
 * @returns {Element404}
 * */
Element404.prototype.render= function(target=undefined){

    if(this.child){
        this.father.render();
        return this;
    }

    if(target){
        this.target = target
       if(target instanceof  Element404){
           this.target = target.root
       }
    }

    this.total_render_times+=1;
    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
    return this;

}

/**
 * @returns {number}
 * */
Element404.prototype.get_total_render = function (){
    if(this.child){
        return this.father.get_total_render();
    }
    return this.total_render_times;
}





/**
 * @param {object} key_or_index
 * @returns {Element404}
 * */
Element404.prototype.subStateObject = function(key_or_index) {

    let created =  this.stored_state[key_or_index];
    if(!created){
        created = {}
        this.stored_state[key_or_index] =created
    }
    let sub_element = new Element404();
    sub_element.sub_element(this,this.root);
    sub_element.stored_state = created
    return sub_element
}


/**
 * @returns {object || Array}
 * */
Element404.prototype.getFullState = function() {
    return this.stored_state;
}
/**
 * @param {string || number} key_or_index
 * @param {any} value
 * */
Element404.prototype.setStateValue = function(key_or_index,value) {
    this.stored_state[key_or_index] = value;
}

/**
 * @param {string || number} key_or_index
 * @param {any} default_value
 * */
Element404.prototype.getStateValue = function(key_or_index,default_value=undefined) {
  let existent = this.stored_state[key_or_index];
  if(existent === undefined){
      this.setStateValue(key_or_index,default_value);
      return default_value;
  }
  return existent;
}











/**
 @typedef {Object} InputStateProps
 @property {string=} default_value
 @property {boolean=}prevent_locker
 @property {boolean=}render_change
 */



/**
 * @param {string} name
 * @param {InputStateProps=} state_props
 * @returns {string}
 */
Element404.prototype.stateInput= function(name,state_props) {

    let formatted_args = new Element404Args(state_props,{});
    /**@type {boolean}*/
    let prevent_locker =formatted_args.get('prevent_locker',true);
    /**@type {string}*/
    let default_value = formatted_args.get('default_value',"");
    let render_change = formatted_args.get('render_change',this.state_render);


    let props =formatted_args.get_no_listed();
    let old_value = this.getStateValue(name,default_value);

    let formatted_props = {

        "notLock_change":(input,event)=>{
            if(this.locked &&prevent_locker ) {
                this.render();
                return;
            }

            this.setStateValue(name, input.value);
            if(!render_change){
                return;
            }
            //wait 0.05 seconds to render
            //these required to avoid race conditions with click event
            let render_num = this.get_total_render();
            let first = true;
            const WAIT_TIME = 100;
            let interval =setInterval(()=>{
                let actual_render = this.get_total_render();
                if(first){
                    first = false;
                    return;
                }

                if(actual_render > render_num){
                    clearInterval(interval);
                    return;
                }

                let active = document.activeElement
                //if active its an input or text area it continue
                if(active.tagName === "INPUT" || active.tagName === "TEXTAREA"){
                    return;
                }


                this.render();
                clearInterval(interval);
            },WAIT_TIME);
            
        },

    


    }

    if(old_value){
        formatted_props.value = old_value
    }

    for(let key in props){
        formatted_props[key] = formatted_args.element[key];
    }

   this.input(formatted_props);

    return old_value;

}





/**
 @typedef {object} NumbericalStateProps
 @property {boolean=} render_change
 @property {number=null} default_value
 @property {string=}tag
 */



/**
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {NumbericalStateProps=} state_props
 * @returns {number}
 */
Element404.prototype.stateIncrease = function(
    name,
    value,
    content,
    state_props
    ){

    let formatted_args = new Element404Args(state_props,{});
    let render_change =  formatted_args.get("render_change",this.state_render);
    let default_value = formatted_args.get('default_value',0);
    let tag = formatted_args.get("tag","button");
    let props = formatted_args.get_no_listed();
    let old_value = this.getStateValue(name,default_value);

    let formatted_props = {
        click:()=>{

            let old_value = Number(this.getStateValue(name,default_value));
            this.setStateValue(name,old_value+value);
            if(render_change){
                this.render();

            }
        }
    }
    for(let key in props){
        formatted_props[key] = props[key];
    }
    this.create(tag,content,formatted_props);
    return old_value;

}


/**
 * @param {string} name
 * @param {number} value
 * @param {string} content
 * @param {NumbericalStateProps=} state_props
 * @returns {number}
 */
Element404.prototype.stateDecrease = function(
    name,
    value,
    content,
    state_props
){

    let formatted_args = new Element404Args(state_props,{});
    let render_change =  formatted_args.get("render_change",this.state_render);
    let default_value = formatted_args.get('default_value',0);
    let tag = formatted_args.get("tag","button");
    let props = formatted_args.get_no_listed();

    let old_value = this.getStateValue(name,default_value);

    let formatted_props = {
        click:()=>{

            let old_value = Number(this.getStateValue(name,default_value));
            this.setStateValue(name,old_value-value);
            if(render_change){
                this.render();

            }
        }
    }
    for(let key in props){
        formatted_props[key] = props[key];
    }
    this.create(tag,content,formatted_props);
    return old_value;

}

/**
 @typedef {object} SelectStateProps
 @property {boolean=true} prevent_locker
 @property {boolean} render_change
 @property {string=null} default_value

 */



/**
 * @param {string} name
 * @param {Array<string> | Object} options
 * @param {SelectStateProps=} state_props
 * @returns {string}
 */
Element404.prototype.stateSelect = function(
    name,
    options,
    state_props
){


    let formatted_args = new Element404Args(state_props,{});
    let prevent_locker =formatted_args.get('prevent_locker',true);
    let render_change =  formatted_args.get("render_change",this.state_render);
    let default_value = formatted_args.get('default_value');
    let props = formatted_args.get_no_listed();

    let formatted_props = {
        "notLock_change":(select)=>{
            if(this.locked  && prevent_locker){
                this.render();
                return;
            }
            this.setStateValue(name,select.value);
            if(render_change){
                this.render();
            }
        }


    }

    for(let key in props){
        formatted_props[key] = props[key];
    }
    this.select(()=> {
            let old_value =  this.getStateValue(name,default_value);

            if (options.constructor.name === 'Object') {

                for (let key in options) {
                    if (key === old_value) {
                        this.option(options[key], {"value": key, "selected": true});
                        continue;
                    }
                    this.option(options[key], {"value": key});
                }
            }

            if (options.constructor.name === 'Array') {
                options.forEach((option) => {
                    if (option === old_value) {
                        this.option(option, {"value": option, "selected": true});
                        return;
                    }
                    this.option(option, {"value": option});
                }, formatted_props);

            }
        }

        ,formatted_props);

    return this.getStateValue(name,default_value);

}



/**
 * @typedef {Object} SetterState
 * @property {string=}tag
 * @property {object=}props
 * @property {function || string} content
 * */


/**
 * @param {string} name
 * @param {any} value
 * @param {SetterState} selected_value
 * @param {SetterState} unselected_value
 * @param {boolean} render
 * */
Element404.prototype.stateSetter = function(
    name,
    value,
    selected_value,
    unselected_value,
    render=undefined
){


    let old_value = this.getStateValue(name);

    if(render === undefined){
        render = this.state_render;
    }
    /**@type {Element404Props}*/
    let formatted_props = {
        click:()=>{

            this.setStateValue(name,value)
            if(render){
                this.render();
            }
        }
    }
    let is_selected = old_value === value;
    let corresponded_value= is_selected ? selected_value: unselected_value;
    let props = corresponded_value.props;

    let tag = corresponded_value.tag ? corresponded_value.tag: "button";
    let content = corresponded_value.content;

    for(let key in props){
        formatted_props[key] = props[key];
    }

    this.create(tag,content,formatted_props);
    return old_value

}





/** @param {HTMLElement} domElement 
 * @param {string} key
 * @param {string|function} value
*/
Element404.prototype.set_prop = function(domElement,key,value){




    if(key === 'responsive_style'){


        Element404Globals.resize_elements .unshift({
            style_value:value,
            domElement:domElement
        })


    }
    if(key === 'style' || key === 'responsive_style'){
        let create_style = Element404Style.create_style(value);
        domElement.setAttribute('style',create_style)
        return;
    }



    if(value instanceof Function){

        let callback = (event)=>{

            if(this.locked && key.includes('notLock_') === false){
                return;
            }
            
            value(domElement,event)
            if(key.includes('render_')){
                this.render()
            }

        }

        const  TAGS  = ['render_','notLock_'];
        let formatted_key = key
        for (let tag of TAGS){
            formatted_key = formatted_key.replace(tag,'')
        }

        domElement.addEventListener(formatted_key,callback)
        return
    }

    domElement.setAttribute(key,value)
}




/**
 @typedef {function} Element404Event
 @param {HTMLElement} Element
 @param {UIEvent} event
 */

/**
 @typedef {object} Element404Props
 @property {object || string || undefined} style
 @property {Element404Event || undefined} click
 @property {Element404Event || undefined} render_click
 @property {Element404Event || undefined} NotLock_render_click
 @property {Element404Event|| undefined} change


 */


/**
 * @param {HTMLElement} domElement
 * @param {Element404Props || undefined } props
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
 * @param {Element404Props } props
 * */
Element404.prototype.generate_component_reference=function(domElement,content,props){
    this.set_props(domElement,props)


    let formatted_content = Element404Extras.get_func_result(content)

    if(formatted_content){
        let node = document.createTextNode(formatted_content)
        domElement.appendChild(node)
    }


}

/**
 * @param {string || undefined} tag
 * @param {string || function || undefined} content
 * @param {Element404Props || undefined} props
 * @returns {Element404}
 * */
Element404.prototype.sub_component=function( tag,content,props){
    let sub_element = new Element404();

    let tag_not_exist = tag === undefined || tag === null

    if(tag_not_exist){

        let formatted_content = Element404Extras.get_func_result(content)
        let node = document.createTextNode(formatted_content)
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
 * @param {string || undefined} tag The tag of element
 * @param {function || string} content the internal content
 * @param {Element404Props || undefined} props The object props
 * @returns {Element404}
 */
Element404.prototype.create=function(tag =undefined,content =undefined,props=undefined){

   return  this.sub_component(tag,content,props)
    
}



/**
 * Creates a form
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 * */
Element404.prototype.input=function(props=null){
    return this.create('input',null,props)
}


/**
 * Creates a div
 * @param {function || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.div=function(content=null,props=null){
    return this.create('div',content,props)
}

/**
 * Creates a nav
 * @param {function || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.nav=function(content=null,props=null){
    return this.create('nav',content,props)
}

/**
 * Creates a code block
 * @param {function || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.code = function(content, props = null) {
    return this.create('code', content, props);
}

/**
 * Creates a preformatted text block
 * @param {function || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.pre = function(content, props = null) {
    return this.create('pre', content, props);
}

/**
 * Creates an paragraph
 * @param {function || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.p=function(content,props=null){
    return this.create('p',content,props)
}


/**
 * Creates a h1
 * @param {function || string } content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h1=function(content,props=null){
    return this.create('h1',content,props)
}



/**
 * Creates a h2
 * @param {function || string} content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.h2=function(content,props=null){
    return this.create('h2',content,props)
}



/**
 * Creates an H3
 * @param {function | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h3=function(content,props=null){
   return  this.create('h3',content,props)
}
/**
 * Creates an H4
 * @param {function | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h4=function(content,props=null){
   return  this.create('h4',content,props)
}


/**
 * Creates a H5
 @param {function | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h5=function(content,props=null){
    return this.create('h5',content,props)
}

/**
 * Creates an select
 @param {function} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.select=function(content,props=null){
   return  this.create('select',content,props)
}

/**
 * Creates an option
 * @param {function || string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.option=function(content,props=null){
  return  this.create('option',content,props)
}


/**
 * Creates a table
 * @param {function | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.table=function(content,props){
   return  this.create('table',content,props)
}

/**
 * Creates a td
 * @param {function | string} content the internal content
 @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.td=function(content,props=null){
   return  this.create('td',content,props)
}

/**
 * Creates a tr
 * @param {function | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.tr=function(content,props=null){
    return this.create('tr',content,props)
}


/**
 * Creates a th
 * @param {function | string} content the internal content
 * @param {Element404Props || null } props The object props
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
 * @param {Element404Props || null  } props The object props
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

