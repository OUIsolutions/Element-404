
 function Element404(){


        /** @type {Element404} */
        this.father = null;
        
        /** @type {boolean} */
        this.child = false;


        /** @type {boolean} */
        this.locked = false;


        /** @type {DocumentFragment} */
        this.root;
        
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
     this.generator = ()=>{generator(this)}
     this.target = target;
}

Element404.prototype.sub_component = function(father,root){
     this.father = father;
     this.root = root;
     this.child = true;     
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

