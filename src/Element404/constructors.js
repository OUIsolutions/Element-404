
function Element404(){
    
        /**@type {Object || Array || Function  || undefined}*/
        this.style = undefined;


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

