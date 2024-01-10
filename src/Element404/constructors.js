
function Element404(){
    
        /**@type {Element404Props}*/
        this.props = undefined;

        /**@type {Array<Object> || {Object}} */
        this.style_data = undefined;
        this.is_inline_style = false;

        this.smart_state_active = false;
        this.smart_state_test = undefined;


        /**@type {Array<Element404>}*/
        this.stored_sub_elements = [];

        /**@type {function}*/
        this.generator = undefined;

        /** @type {DocumentFragment || HTMLElement} */
        this.domElement = undefined;

        /** @type {HTMLElement} */
        this.target = undefined;


        this.included_in_father_dom = false;

        this.identifier = Math.random().toString();
        this.child_style = undefined;

        /** @type {boolean} */
        this.child = false;


        this.state_smart_render = false;
        this.state_full_render = false;
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


    this.generator = (args)=>{
        generator(this,args)
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
function  createElement404(generator,target=undefined){
     let created =  new Element404();
     created.rootConstructor(generator,target);
     return created;
}

