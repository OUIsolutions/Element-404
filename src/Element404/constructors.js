

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
 * @typedef {function} Element404_generator
 * @param {Element404} main_interfface
 * */



/**
 * @param {Element404_generator} generator
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
    this.state_render = this.father.state_render;
    this.last_input = this.father.last_input;
    this.stored_state = this.father.stored_state;
     return this;
} 



/**
 * @param {Element404_generator} generator
 * @param {HTMLElement=} target
 * @returns {Element404}
 */
function  createElement404(generator,target=undefined){
     let created =  new Element404();
     created.rootConstructor(generator,target);
     return created;
}

