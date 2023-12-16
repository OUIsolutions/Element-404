/**
 * @param {function} generator 
 * @param {HTMLElement} target
 */
 function Element404(generator,target){
        /** @type {DocumentFragment} */
        this.root = document.createDocumentFragment();

        /** @type {boolean} */
        this.locked = false;
        
        /** @type {function} */
        this.generator = ()=>{generator(this)}
        /** @type {HTMLElement} */  
        this.target = target;
 }

 
/**
 * @param {function} generator
 * @param {HTMLElement} target
 */
function  createElement404(generator,target){
     return new Element404(generator,target)
}

