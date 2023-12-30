
function Element404(){
    
        /**@type {Element404Props}*/
        this.props = undefined;


        this.style_data = undefined;
        this.inline_style = false

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

