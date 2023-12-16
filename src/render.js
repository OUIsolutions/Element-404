


/**
 * Returns the sum of all numbers passed to the function.
* @param {HTMLElement=} target The target to render
*/
Element404.prototype.render= function(){

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}


