

const ELEMENT_404_INLINE_STYLE = "inline_style"
const ELEMENT_404_OUTLINE_STYLE = "outline_style"
const ELEMENT_404_STYLE_ARGS = "style_args"

const ELEMENT_404_STYLE_TAGS = [
    ELEMENT_404_INLINE_STYLE,
    ELEMENT_404_OUTLINE_STYLE,
    ELEMENT_404_STYLE_ARGS
]
const ELEMENT_404_NOT_LOCK = "not_lock_"
const  ELEMENT_404_FULL_RENDER = 'full_render_'
const ELEMENT_404_QUANTUM_RENDER = 'quantum_render_'
const ELEMENT_404_NUMBER = 'number'
const  ELEMENT_404_RENDER_TAGS = [
    ELEMENT_404_NOT_LOCK,
    ELEMENT_404_FULL_RENDER,
    ELEMENT_404_QUANTUM_RENDER
]
const  ELEMENT_404_EMPTY = ''

const ELEMENT_404_CHANGE = 'change';
const ELEMENT_404_NOT_LOCK_CHANGE = ELEMENT_404_NOT_LOCK + ELEMENT_404_CHANGE;
const  ELEMENT_404_VALUE = 'value';
const  ELEMENT_404_START_VALUE = 'start_value';
const ELEMENT_404_PREVENT_LOCKER  = 'prevent_locker';
const  ELEMENT_404_TAG = 'tag';
const  ELEMENT_404_BUTTON = 'button';
const ELEMENT_404_PREVENT_LOCK = true;
const  ELEMENT_404_RENDER_CHANGES ="render_change";
const ELEMENT_404_STRING="String";
const ELEMENT_404_ARRAY="Array";
const ELEMENT_404_OBJECT="Object";
const  ELEMENT_404_SELECTED = 'selected'
    //style render
const ELEMENT_404_STATE="state";
const ELEMENT_404_MERGE_IF="mergeIf";
const  ELEMENT_404_MEDIA="media";
const ELEMENT_404_IDENTIFIER_TAG="Element404Identifier";

const  ELEMENT_404_STYLE_KEYS_TO_IGNORE=[
    ELEMENT_404_MERGE_IF,
    ELEMENT_404_MEDIA,
    ELEMENT_404_IDENTIFIER_TAG
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
                final_text+=`[${ELEMENT_404_IDENTIFIER_TAG}="${this.identifier}"]`
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

        if(value.constructor.name === ELEMENT_404_ARRAY){
            for(let current_element of value){
                let executed_value = Element404Extras.get_func_result(current_element,undefined,this.args);
                this.recursive_create_style(media_name,state_name,executed_value,media_activated,state_activated);

            }
        }

        if(value.constructor.name === ELEMENT_404_OBJECT){

            if(value[ELEMENT_404_MERGE_IF]){
                /**@type {function}*/
                let merge_if_callback  = value[ELEMENT_404_MERGE_IF];

                let evaluation_result = Element404Extras.get_func_result(merge_if_callback,undefined,this.args)
                if(!evaluation_result){
                    return;
                }
            }

            if(value[ELEMENT_404_MEDIA]&& !media_activated){
                let new_media_names = Element404Extras.convert_to_list(value[ELEMENT_404_MEDIA]);
                for(let current_media of new_media_names){
                    this.recursive_create_style(current_media,state_name,value,true,state_activated);
                }
                return;
            }

            if(value[ELEMENT_404_STATE] && !state_activated){
                let new_state_names = Element404Extras.convert_to_list(value[ELEMENT_404_STATE]);

                for(let current_state of new_state_names){
                    this.recursive_create_style(media_name,current_state,value,media_activated,true);
                }
                return;
            }



            for(let key in value){
                if (ELEMENT_404_STYLE_KEYS_TO_IGNORE.includes(key)){
                    continue;
                }

                let current_value = value[key];
                let executed_value = Element404Extras.get_func_result(current_value,undefined,this.args);
                if(executed_value.constructor.name === ELEMENT_404_STRING){
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
        if (executed_value.name === ELEMENT_404_STRING) {
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

        /**@type {Element404}*/
        this.root_element = undefined;

        /**@type {Array<Object> || {Object}} */
        this.style_data = undefined;
        this.is_inline_style = false;


        this.smart_state_active = false;
        this.smart_state_test = undefined;

        this.allow_state_quantum_render = false;
        this.state_full_render = false;

        /**@type {Array<Element404>}*/
        this.stored_sub_elements = [];

        /**@type {function}*/
        this.generator = undefined;

        /** @type {DocumentFragment || HTMLElement || HTMLInputElement || HTMLSelectElement} */
        this.domElement = undefined;


        /** @type {HTMLElement} */
        this.target = undefined;


        this.included_in_father_dom = false;

        this.identifier = Math.random().toString();
        this.child_style = undefined;

        /** @type {boolean} */
        this.child = false;



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
Element404.prototype.rootConstructor = function(generator=undefined,target=undefined){

    this.generator = (args)=>{
        if(generator){
            generator(this,args)

        }
    }


    this.domElement = document.createDocumentFragment();



    //means its an component inside interfacce
    if(target instanceof  Element404){
        this.included_in_father_dom = true;
        this.target = target.domElement
        target.stored_sub_elements.unshift(this);

        return  this
    }

    this.target = target;
    return this;
}



/**
 * Creates a new Element 404
 * @param {Element404Generator} generator
 * @param {HTMLElement || DocumentFragment || Element404} target
 ** @returns {Element404}
 */
function  createElement404(generator=undefined,target=undefined){
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
        this.clear();
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

Element404.prototype.get_value = function (){
    return this.domElement.value;
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


Element404.prototype.superposition= function(content) {


    let sub_element = new Element404();


    if(this.child){
        sub_element.sub_element(this.root_element,this,this.domElement);
    }
    if(!this.child){
        sub_element.sub_element(this,this,this.domElement);
    }


    sub_element.create_generator(content)
    this.stored_sub_elements.push(sub_element);
    return sub_element


}

Element404.prototype.private_colapse = function (){
    this.smart_state_active = true;
    this.render();
}

Element404.prototype.quantum_clear = function (){

    this.smart_state_active = false;

    let total_active = 0;
    this.father.stored_sub_elements.forEach(e=>{
        if(e.smart_state_active){
            total_active+=1;
        }
    })
    if(total_active  === 0){
        this.clear();

    }
}


Element404.prototype.always_colapse = function (){


    this.private_colapse();
    this.smart_state_test = ()=>{
        this.private_colapse();
    }
    return this;

}
Element404.prototype.re_colapse_always_if = function (test){


    this.private_colapse();


    this.smart_state_test = ()=>{

        if(!this.smart_state_active){
            this.private_colapse();
            return;
        }


        let test_result = test();

        if(test_result){
            this.private_colapse();
        }


    }
    return this;

}



Element404.prototype.colapse_always_if = function (test){

    if(test()){
        this.render();
    }

    this.smart_state_test = ()=>{
        let test_result = test();

        if(test_result){
            this.private_colapse();
        }
        if(!test_result){
            this.quantum_clear();
        }

    }
    return this;

}


Element404.prototype.colapse_once_if = function (test){


    if(test()){
        this.smart_state_active = true;
        this.render();
    }

    this.smart_state_test = ()=>{



        let test_result = test();

        if(test_result && !this.smart_state_active){
            this.private_colapse();
        }

        if(!test_result){
            this.quantum_clear();
        }


    }
    return this;

}


Element404.prototype.quantum_render=function(root=false) {

    if(root && this.child){
        this.root_element.quantum_render();
    }
    //console.log(this);


    this.stored_sub_elements.forEach(element =>{

        if(element.smart_state_test){
            element.smart_state_test();
        }

        element.quantum_render();

    })
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


    if(this.allow_state_quantum_render){
        this.quantum_render(true);
        return;
    }


    if(this.state_full_render){
        this.render({root_render:true})
    }

}

/**
 * @param {string || number} key_or_index
 * @param {any} default_value
 * */
Element404.prototype.getStateValue = function(key_or_index,default_value=undefined) {
  let existent = this.stored_state[key_or_index];
  if(existent === undefined){
      this.stored_state[key_or_index] = default_value;
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
 * @returns {Element404}
 */
Element404.prototype.stateInput= function(name,state_props) {

    let formatted_args = new Element404Args(state_props,{});
    let prevent_locker =formatted_args.get(ELEMENT_404_PREVENT_LOCKER,ELEMENT_404_PREVENT_LOCK);
    let default_value = formatted_args.get(ELEMENT_404_VALUE,ELEMENT_404_EMPTY);
    let props = formatted_args.get_no_listed();

    props.value = this.getStateValue(name, default_value)

    props[ELEMENT_404_NOT_LOCK_CHANGE] =(input)=>{
            let old = this.getStateValue(name,ELEMENT_404_EMPTY);

            if(this.is_locked()  && prevent_locker){
                input.value =old;
                return;
            }
            if(props.type === ELEMENT_404_NUMBER){
                this.setStateValue(name,parseInt(input.value));
            }
            if(props.type !== ELEMENT_404_NUMBER){
                this.setStateValue(name,input.value);
            }
    }


    return this.input(props);

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
 * @returns {Element404}
 */
Element404.prototype.stateIncrease = function(
    name,
    value,
    content,
    state_props
    ){

    let formatted_args = new Element404Args(state_props,{});
    let default_value = formatted_args.get(ELEMENT_404_START_VALUE,0);
    let tag = formatted_args.get(ELEMENT_404_TAG,ELEMENT_404_BUTTON);
    let props = formatted_args.get_no_listed();

    props.click =()=>{
            let old_value = Number(this.getStateValue(name,default_value));
            this.setStateValue(name,old_value+value);
    }



    return this.create(tag, content, props)

}




Element404.prototype.stateDecrease = function(
    name,
    value,
    content,
    state_props
){

    let formatted_args = new Element404Args(state_props,{});
    let default_value = formatted_args.get(ELEMENT_404_START_VALUE,0);
    let tag = formatted_args.get(ELEMENT_404_TAG,ELEMENT_404_BUTTON);
    let props = formatted_args.get_no_listed();

    props.click =()=>{
        let old_value = Number(this.getStateValue(name,default_value));
        this.setStateValue(name,old_value-value);
    }

    return this.create(tag, content, props)

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
    let prevent_locker =formatted_args.get(ELEMENT_404_PREVENT_LOCKER,true);
    let default_value = formatted_args.get(ELEMENT_404_VALUE,options[0]);
    let props = formatted_args.get_no_listed();

    props[ELEMENT_404_NOT_LOCK_CHANGE] = (select)=>{
            if(this.is_locked()  && prevent_locker){
                this.render();
                return;
            }

            let its_boolean = select.value  === 'true' || select.value === 'false';

            if(its_boolean){
                if(select.value === 'true'){
                    this.setStateValue(name,true);
                }

                if(select.value === 'false'){
                    this.setStateValue(name,false);
                }

            }
            if(!its_boolean){
                this.setStateValue(name,select.value);
            }

    }


    this.select(()=> {
            let old_value =  this.getStateValue(name,default_value);

            if (options.constructor.name === ELEMENT_404_OBJECT) {

                for (let key in options) {

                    let option  = this.option(options[key]);
                    option.set_prop(ELEMENT_404_VALUE,key);

                    if (key === old_value) {
                        option.set_prop(ELEMENT_404_SELECTED,true);
                    }

                }
            }


            if (options.constructor.name ===ELEMENT_404_ARRAY) {

                options.forEach((option) => {

                    let option_element =this.option(option);
                    if (option === old_value) {
                        option_element.set_prop(ELEMENT_404_SELECTED,true);
                    }

                });

            }

        },props);


    return this.getStateValue(name,default_value);

}






/**
 * @param {string} key
 * @param {string | function || object} value
 * @return {Element404}
*/
Element404.prototype.set_prop = function(key,value){

    if(value instanceof Function){
        let callback = (event)=>{

            if(this.is_locked() && key.includes(ELEMENT_404_NOT_LOCK) === false){
                return;
            }

            value(this.domElement,event)
            if(key.includes(ELEMENT_404_FULL_RENDER)){

                this.render({root_render:true})
            }
            if(key.includes(ELEMENT_404_QUANTUM_RENDER)){
                this.quantum_render(true);
            }

        }

        let formatted_key = key
        for (let tag of ELEMENT_404_RENDER_TAGS){
            formatted_key = formatted_key.replace(tag,ELEMENT_404_EMPTY)
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

    let style_args = props[ELEMENT_404_STYLE_ARGS];

    if(!style_args){
        style_args = {};
    }

    if(props[ELEMENT_404_INLINE_STYLE]){
        this.style_data = props[ELEMENT_404_INLINE_STYLE]
        this.is_inline_style = true;
        this.render_style(style_args);
    }

    if(props[ELEMENT_404_OUTLINE_STYLE]){
        this.style_data = props[ELEMENT_404_OUTLINE_STYLE]
        this.is_inline_style = false;
        this.render_style(style_args);
    }


    for (const key in props){
        if(ELEMENT_404_STYLE_TAGS.includes(key)){
            continue;
        }

        this.set_prop(key,props[key])
    }

}

/**
 * @param {string || function } content
 * @param {Element404Props } props
 * */
Element404.prototype.create_generator=function(content, props=undefined){

    this.generator = (args)=>{
        this.domElement.innerHTML = ELEMENT_404_EMPTY;
        let root_element = this.root_element;
        let old_root_doom_element = root_element.domElement;
        let old_root_stored_sub_elements = root_element.stored_sub_elements;

        root_element.domElement = this.domElement;
        root_element.stored_sub_elements = this.stored_sub_elements;

        if(props){
            this.set_props(props)
        }

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

        root_element.domElement = old_root_doom_element;
        root_element.stored_sub_elements = old_root_stored_sub_elements;
    }


}

/**
 * @param {Element404} root_element
 * @param {Element404} father
 * @param {DocumentFragment || HTMLElement ||  Text} domElement
 * @returns {Element404}
 */
Element404.prototype.sub_element = function(root_element,father,domElement){
    /** @type {Element404} */
    this.root_element = root_element;
    this.father = father;
    /** @type {DocumentFragment || HTMLElement ||  Text}  */
    this.domElement = domElement;

    this.child = true;
    this.state_full_render = this.father.state_full_render;
    this.allow_state_quantum_render = this.father.allow_state_quantum_render;
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
    if(this.child){
        sub_element.sub_element(this.root_element,this,domElement);
    }
    if(!this.child){
        sub_element.sub_element(this,this,domElement);
    }
    sub_element.create_generator(content,props)
    sub_element.generator({});

    this.stored_sub_elements.push(sub_element);
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

