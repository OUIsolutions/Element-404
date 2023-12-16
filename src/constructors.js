
 function Element404(){

        
        /** @type {boolean} */
        this.child = false;


        /** @type {boolean} */
        this.locked = false;


 }




/**
 * @param {function} generator 
 * @param {HTMLElement} target
 */
Element404.prototype.rootConstructor = function(generator,target){
    /** @type {DocumentFragment} */
    this.root = document.createDocumentFragment();
    /** @type {function} */
    this.generator = ()=>{generator(this)}
    /** @type {HTMLElement} */
    this.target = target;
}

Element404.prototype.sub_element = function(father,root){
    /** @type {Element404} */
    this.father = father;
    /** @type {DocumentFragment} */
    this.root = root;

     this.child = true;     
} 


/**
 * @param {function} generator
 * @param {HTMLElement} target
 */
function  createElement404(generator,target){
     let created =  new Element404();
     created.rootConstructor(generator,target);
     return created;
}

