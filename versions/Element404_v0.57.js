
let Element404Constants = {}

Element404Constants.RENDER_CHANGES ="render_change";
Element404Constants.STRING="String";
Element404Constants.ARRAY="Array";
Element404Constants.OBJECT="Object";

    //style render
Element404Constants.STATE="state";
Element404Constants.MERGE_IF="mergeIf";
Element404Constants.MEDIA="media";
Element404Constants.IDENTIFIER_TAG="Element404Identifier";

Element404Constants.STYLE_KEYS_TO_IGNORE=[
    Element404Constants.MERGE_IF,
    Element404Constants.MEDIA,
    Element404Constants.IDENTIFIER_TAG
];





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
     * @param {any} props
     * @return {any}
     * */
    get_func_result(element,caster = undefined,props=undefined){
        if(typeof(element) === "function"){
            return this.get_func_result(element(props),caster)
        }
        if(caster){
            return caster(element)
        }

        return  element
    },

    convert_to_list(element){
        if(typeof (element) === "string"){
            return[element]
        }
        return  element

    }
}




let Element404InlineStyle = {


    /**
     * @param {object} style_value
     * @param {any} args
     * @return {string}
     **/
    create_object_style(style_value,args){



        if(style_value['mergeIf']){

            let evaluation_result = Element404Extras.get_func_result(style_value['mergeIf'],undefined,args)
            if(!evaluation_result){
                return ""
            }
        }

        let style_string = ""

        for (const key in style_value){
            let value = Element404Extras.get_func_result(style_value[key],undefined,args)

            if(key === 'mergeif'){
                continue;
            }

            if(value.constructor.name === 'Object'){

                style_string+=this.create_object_style(value,args)
                continue;
            }

            style_string+=`${key}:${value};`
        }

        return style_string
    },



    /**
     * @param {string || Array || object} value
     * @param {any} args
     * @returns {string}
     * */
    create_style(value,args){


            if(value instanceof  String){
                return value
            }

            let formatted_props = args;
            if(!formatted_props){
                formatted_props = {}
            }
            if(value.constructor.name ===  'Object'){
                return this.create_object_style(value,formatted_props)
            }

            if(value.constructor.name === 'Array'){
                let style_string = ''
                for(let element of value){
                    style_string+=this.create_object_style(element,formatted_props)
                }
                return style_string
            }


    }
}


/**
 * @typedef ComponentStyleState
 * @property {string} state_name
 * @property {string} css_value
 * */

/**
 * @typedef Element404Media
 * @property {string} media_name
 * @property {Array<ComponentStyleState>} states
 *
 * */
class  Element404Outline{
    /**@type {Array<Element404Media>}*/
    medias = [];

    /**
     * @param {number} identifier
     * @param {any} args
     * @param {object || array || function || string} start_value
     * */
    constructor(identifier,args,start_value) {
        this.start_value = start_value
        this.identifier = identifier;
        this.args = args;
    }


    /**
     * @param {string || undefined} media_name
     * @param {string || undefined} state_name
    *@return {ComponentStyleState}
    * */
    get_element(media_name,state_name){
        let media_element = undefined;
        let current_state = undefined;

        for(let current_media of this.medias){
            if(current_media.media_name === media_name){
                media_element = current_media;
                break;
            }
        }

        if(!media_element){
            media_element = {media_name:media_name,states:[]};
            this.medias.unshift(media_element);
        }

        for(let state of media_element.states){
            if(state.state_name === state_name){
                current_state = state;
            }
        }
        if(!current_state){
            current_state = {state_name:state_name,css_value:""};
            media_element.states.unshift(current_state)

        }
        return current_state;
    }

    /**
     * @param {string || undefined} media_name
     * @param {string || undefined} state_name
     * @param {string} value
     * */
    set_text(media_name,state_name,value){
        let media = this.get_element(media_name,state_name);
        media.css_value+= value

    }

    /**
     * @return {string}
     * */
    render(){

        let final_text = ''
        for(let media of this.medias){

            let media_name = media.media_name;
            if(media_name){
                    media_name = media_name.replace('@media',' ');
                    final_text+=`@media ${media_name} {`
            }

            for(let state of media.states){
                final_text+=`[${Element404Constants.IDENTIFIER_TAG}="${this.identifier}"]`
                let state_name = state.state_name;
                if(state_name){
                    state_name = state_name.replace(":","").replace(" ","")
                    final_text+=`:${state_name}`
                }
                final_text+=`{${state.css_value}}`
            }


            if(media_name){
                final_text+="}"

            }
        }
        return  final_text;
    }
    /**
     * @param {string || undefined} media_name
     * @param {string || undefined} state_name
     * @param  {string || Array || Object} value
     * @param {boolean} media_activated=false
     * @param {boolean} state_activated=false
     * */
    recursive_create_style(
        media_name,
        state_name,
        value,
        media_activated=false,
        state_activated=false
    ) {

        if(value.constructor.name === Element404Constants.ARRAY){
            for(let current_element of value){
                let executed_value = Element404Extras.get_func_result(current_element,undefined,this.args);
                this.recursive_create_style(media_name,state_name,executed_value,media_activated,state_activated);

            }
        }

        if(value.constructor.name === Element404Constants.OBJECT){

            if(value[Element404Constants.MERGE_IF]){
                /**@type {function}*/
                let merge_if_callback  = value[Element404Constants.MERGE_IF];

                let evaluation_result = Element404Extras.get_func_result(merge_if_callback,undefined,this.args)
                if(!evaluation_result){
                    return;
                }
            }

            if(value[Element404Constants.MEDIA]&& !media_activated){
                let new_media_names = Element404Extras.convert_to_list(value[Element404Constants.MEDIA]);
                for(let current_media of new_media_names){
                    this.recursive_create_style(current_media,state_name,value,true,state_activated);
                }
                return;
            }

            if(value[Element404Constants.STATE] && !state_activated){
                let new_state_names = Element404Extras.convert_to_list(value[Element404Constants.STATE]);

                for(let current_state of new_state_names){
                    this.recursive_create_style(media_name,current_state,value,media_activated,true);
                }
                return;
            }



            for(let key in value){
                if (Element404Constants.STYLE_KEYS_TO_IGNORE.includes(key)){
                    continue;
                }

                let current_value = value[key];
                let executed_value = Element404Extras.get_func_result(current_value,undefined,this.args);
                if(executed_value.constructor.name === Element404Constants.STRING){
                    let formatted_text = `${key}:${executed_value};`
                    this.set_text(media_name,state_name,formatted_text);
                    continue;
                }
                this.recursive_create_style(media_name,state_name,executed_value);
            }
        }




    }

        /**

     * @returns {string}
     * */
    create_style(){
        let executed_value = Element404Extras.get_func_result(this.start_value,undefined,this.args);
        if (executed_value.name === Element404Constants.STRING) {
           this.set_text(undefined,undefined,executed_value);
           return this.render();
        }


        this.recursive_create_style(undefined,undefined,executed_value);
        return this.render();


    }

}

function Element404(){
    
        /**@type {Element404Props}*/
        this.props = undefined;

        /**@type {Array<Object> || {Object}} */
        this.style_data = undefined;
        this.is_inline_style = false
        /**@type {Array<Element404>}*/
        this.stored_sub_elements = [];


        this.included_in_father_dom = false;

        this.identifier = Math.random().toString();
        this.child_style = undefined;

        /** @type {boolean} */
        this.child = false;

        this.state_render = false;
        /** @type {number} */
        this.total_render_times = 0;

        /** @type {object} */
        this.stored_state = {};
        this.render_args = {}

        /** @type {boolean} */
        this.locked = false;


 }
/**
 * @typedef {function} Element404Generator
 * @param {Element404} main_interfface
 * @param {any}args
 * */



/**
 * @param {Element404Generator} generator
 * @param {HTMLElement || DocumentFragment || Element404} target
 * @returns {Element404}
 */
Element404.prototype.rootConstructor = function(generator,target){


    /** @type {function} */
    this.generator = (args)=>{
        generator(this,args)
    }

    /** @type {DocumentFragment || HTMLElement} */
    this.domElement = document.createDocumentFragment();



    //means its an component inside interfacce
    if(target instanceof  Element404){
        this.included_in_father_dom = true;
        this.target = target.domElement
        target.stored_sub_elements.unshift(this);

        return  this
    }


    /** @type {HTMLElement} */
    this.target = target;
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

Element404.prototype.is_locked = function (){
    if(this.child){
        return this.father.is_locked();
    }
    return  this.locked;
}

Element404.prototype.unlock=function(){
        this.locked = false;        
}







Element404.prototype.clear = function (){
    this.domElement.innerHTML = '';
    this.stored_sub_elements = [];
}


/**
 * @param {any} args
 * */
Element404.prototype.render_style = function (args=undefined){
    if(!this.style_data){
        return;
    }

    if(this.is_inline_style){
        let create_style = Element404InlineStyle.create_style(this.style_data,args);
        this.domElement.setAttribute('style',create_style);
    }
    let outline = !this.is_inline_style;
    if(outline){
        let style_obj = new Element404Outline(this.identifier,args,this.style_data);
        let generated_style = style_obj.create_style();
        if(!this.child_style){
            this.child_style =document.createElement('style');
            this.domElement.appendChild(this.child_style);
        }
        this.child_style.innerHTML = generated_style;
        this.domElement.setAttribute('Element404Identifier',this.identifier)
    }

}
/**
 * @param {Array<Object> || {Object}}style
 * @param {any} style_args
 * @return {Element404}
 * */
Element404.prototype.inline_style = function (style,style_args=undefined){
    this.style_data = style;
    this.is_inline_style = true;
    this.render_style(style_args);
    return  this;
}

/**
 * @param {Array<Object> || {Object}}style
 * @param {any} style_args
 * @return {Element404}
 * */
Element404.prototype.outline_style = function (style,style_args=undefined){
    this.style_data = style;
    this.is_inline_style = false;
    this.render_style(style_args);
    return  this;
}

/**
 * Generate the tenderization
 * @param {object} args
 * @returns {Element404}
 * */
Element404.prototype.render= function(args={}){
    let formatted_ars =  new Element404Args(args,{});
    let target = formatted_ars.get('target',undefined);
    let render_args = formatted_ars.get('args',undefined);
    let root_render = formatted_ars.get('root_render',false);

    if(this.child && root_render){
        this.father.render(args);
        return  this;
    }

    if(this.child){
        this.generator(args);
        return this;
    }

    if(!render_args){
        render_args = this.render_args;
    }
    this.render_args = render_args;


    if(target){
        this.target = target
       if(target instanceof  Element404){
           target.clear();
           if(!this.included_in_father_dom){
               target.stored_sub_elements.unshift(this);
           }

           this.target = target.domElement
       }
    }

    this.total_render_times+=1;
    this.target.innerHTML = ''
    this.generator(render_args)
    this.target.appendChild(this.domElement)
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
 * @typedef {function} Element404Testage
 * @param {Element404} value
 * @return {boolean}
 * */

/**
 * @param {Element404Testage} test_callback
 * @return {Array<Element404>}
 * */
Element404.prototype.find = function (test_callback){
    /**@type {Array<Element404>}*/
    let result = []
    for(let item of this.stored_sub_elements){
        let test_result = test_callback(item);
        if(test_result){
            result.unshift(item);
        }
        
        let recursive_result = item.find(test_callback);
        result = result.concat(recursive_result);
    }
    return result;
}

/**
 * @param {Element404Testage} test_callback
 * @return {Element404}
 */
Element404.prototype.findOne = function (test_callback){

    for(let item of this.stored_sub_elements){
        let test_result = test_callback(item);
        if(test_result){
            return item;
        }
        let recursive_result = item.findOne(test_callback);
        if(recursive_result){
            return recursive_result;
        }
        

    }
    return null;
}

/**
 * @param {Element404Testage} test_callback
 * @param {any} args
 * @return {Element404}
 */
Element404.prototype.renderMatch = function (test_callback,args){
    let result = this.find(test_callback);
    for(let item of result){
        item.render({args:args});
    }
    return this;
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
    sub_element.sub_element(this,this.domElement);
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
            if(this.is_locked() &&prevent_locker ) {
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
            if(this.is_locked()  && prevent_locker){
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
Element404.prototype.clickableStateSetter = function(
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





/**
 * @param {string} key
 * @param {string | function || object} value
 * @return {Element404}
*/
Element404.prototype.set_prop = function(key,value){

    if(value instanceof Function){
        let callback = (event)=>{

            if(this.is_locked() && key.includes('notLock_') === false){
                return;
            }
            value(this.domElement,event)
            if(key.includes('render_')){

                this.render({root_render:true})
            }

        }

        const  TAGS  = ['render_','notLock_'];
        let formatted_key = key
        for (let tag of TAGS){
            formatted_key = formatted_key.replace(tag,'')
        }

        this.domElement.addEventListener(formatted_key,callback)
        return this;
    }

    this.domElement.setAttribute(key,value)
    return  this;
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
 * @param {Element404Props || undefined } props
 *  */
Element404.prototype.set_props = function(props){
    this.props = props

    if(!props){
        return;
    }

    let style_args = props['style_args'];

    if(!style_args){
        style_args = {};
    }

    if(props['inline_style']){
        this.style_data = props['inline_style']
        this.is_inline_style = true;
        this.render_style(style_args);
    }

    if(props['outline_style']){
        this.style_data = props['outline_style']
        this.is_inline_style = false;
        this.render_style(style_args);
    }


    const TAGS_TO_IGNORE = ['inline_style','outline_style','style_args']
    for (const key in props){
        if(TAGS_TO_IGNORE.includes(key)){
            continue;
        }

        this.set_prop(key,props[key])
    }

}

/**
 * @param {string || function } content
 * @param {Element404Props } props
 * */
Element404.prototype.create_generator=function(content, props){

    this.generator = (args)=>{
        this.domElement.innerHTML = "";
        let old_root = this.father.domElement;
        let old_stored_sub_elements = this.father.stored_sub_elements;
        this.father.domElement = this.domElement;
        this.father.stored_sub_elements = this.stored_sub_elements;
        this.set_props(props)

        let formatted_content =  content;

        if(formatted_content instanceof  Function){
            let execution_args = args.args;
            if(!execution_args){
                execution_args = {};
            }
            formatted_content = content(this,execution_args);
        }

        if(formatted_content !== undefined && formatted_content !== null){
            formatted_content = String(formatted_content);
        }

        if(formatted_content){
            let node = document.createTextNode(formatted_content)
            this.domElement.appendChild(node)
        }
        this.father.stored_sub_elements = old_stored_sub_elements;
        this.father.domElement = old_root;
    }


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
    this.domElement = root;
    this.child = true;
    this.state_render = this.father.state_render;
    this.stored_state = this.father.stored_state;
    return this;
}


/**
 * @param {string || undefined} tag
 * @param {string || Element404Generator || undefined} content
 * @param {Element404Props || undefined} props
 * @returns {Element404 || undefined}
 * */
Element404.prototype.sub_component=function( tag,content,props){

    let tag_not_exist = tag === undefined || tag === null
    if(tag_not_exist){
        let formatted_content = Element404Extras.get_func_result(content)
        let node = document.createTextNode(formatted_content)
        this.domElement.appendChild(node);
        return;
    }

    let sub_element = new Element404();

    let domElement = document.createElement(tag)
    sub_element.sub_element(this,domElement);
    sub_element.create_generator(content,props)
    sub_element.generator({});

    this.stored_sub_elements.unshift(sub_element);
    this.domElement.appendChild(domElement)


    return sub_element
}



/**
 * 
 * @param {string || undefined} tag The tag of element
 * @param {Element404Generator || string} content the internal content
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
 * @param {Element404Generator || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.div=function(content=null,props=null){
    return this.create('div',content,props)
}


/**
 * Creates a style_data tag
 * @param {Element404Generator || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.style=function(content=null, props=null){
    return this.create('style',content,props)
}

/**
 * Creates a nav
 * @param {Element404Generator || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.nav=function(content=null,props=null){
    return this.create('nav',content,props)
}

/**
 * Creates a code block
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.code = function(content, props = null) {
    return this.create('code', content, props);
}

/**
 * Creates a preformatted text block
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.pre = function(content, props = null) {
    return this.create('pre', content, props);
}

/**
 * Creates an paragraph
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.p=function(content,props=null){
    return this.create('p',content,props)
}


/**
 * Creates a h1
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h1=function(content,props=null){
    return this.create('h1',content,props)
}



/**
 * Creates a h2
 * @param {Element404Generator || string} content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.h2=function(content,props=null){
    return this.create('h2',content,props)
}



/**
 * Creates an H3
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h3=function(content,props=null){
   return  this.create('h3',content,props)
}

/**
 * Creates an H4
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h4=function(content,props=null){
   return  this.create('h4',content,props)
}


/**
 * Creates a H5
 @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h5=function(content,props=null){
    return this.create('h5',content,props)
}

/**
 * Creates an select
 @param {Element404Generator} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.select=function(content,props=null){
   return  this.create('select',content,props)
}

/**
 * Creates an option
 * @param {Element404Generator || string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.option=function(content,props=null){
  return  this.create('option',content,props)
}


/**
 * Creates a table
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.table=function(content,props){
   return  this.create('table',content,props)
}

/**
 * Creates a td
 * @param {Element404Generator | string} content the internal content
 @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.td=function(content,props=null){
   return  this.create('td',content,props)
}

/**
 * Creates a tr
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.tr=function(content,props=null){
    return this.create('tr',content,props)
}


/**
 * Creates a th
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.th=function(content,props=null){
    return this.create('th',content,props)
}

/**
 * Creates an H3
 * @param {string || number} message The object props
 * @returns {Element404}
 */
Element404.prototype.text=function(message){
   return  this.create(undefined,message)
}

/**
 * Creates a button
 * @param {Element404Generator | string || number} content the internal content
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

