
 function Element404(){

        /** @type {DocumentFragment} */
        this.root;

        /** @type {boolean} */
        this.locked;
        
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
     this.locked = false;
     this.generator = ()=>{generator(this)}
     this.target = target;
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

