




/**
 * @param {{'click':function, 'focusout':function}} props -The props of elemment
 */
Element404.prototype.input=function(props){
    this.create('input',props,null)
}


/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.div=function(props,content){
    this.create('div',props,content)
}

/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.p=function(props,content){
    this.create('p',props,content)
}



/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.h1=function(props,content){
    this.create('h1',props,content)
}



/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.h2=function(props,content){
    this.create('h2',props,content)
}


/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.h3=function(props,content){
    this.create('h3',props,content)
}


/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.h4=function(props,content){
    this.create('h4',props,content)
}

/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.h5=function(props,content){
    this.create('h5',props,content)
}


/**
 * @param {function | string | number} content - The content of the element
 */
Element404.prototype.text=function(message){
    this.create(null,null,message)
}

/**
 * @param {{'click':function}} props -The props of elemment
 * @param {function | string} content - The content of the element
 */
Element404.prototype.button=function(props,content){
    this.create('button',props,content)
}

Element404.prototype.br=function(){
    this.create('br')
}
