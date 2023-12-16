
/**
 * Returns the sum of all numbers passed to the function.
 * @param {string } tag The tag of element
 * @param {object} props The object props
 * @param {fuction | string} content the internal content
 */
Element404.prototype.create=function(tag,props,content){

    this.sub_component(tag,props,content)
    
}


/**
 * Returns the sum of all numbers passed to the function.
* @param {HTMLElement=} target The target to render
*/
Element404.prototype.render= function(){

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}


