



/**
 * Creates a form
 * @param {object} props The object props
 * @returns {Element404}

 * */
Element404.prototype.input=function(props){
    return this.create('input',props,null)
}


/**
 * Creates a Div
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.div=function(props,content){
    return this.create('div',props,content)
}


/**
 * Creates an paragraph
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}    
 */
Element404.prototype.p=function(props,content){
    return this.create('p',props,content)
}


/**
 * Creates a h1
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}s
 */
Element404.prototype.h1=function(props,content){
    return this.create('h1',props,content)
}



/**
 * Creates a g2
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h2=function(props,content){
    return this.create('h2',props,content)
}



/**
 * Creates a H3
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h3=function(props,content){
   return  this.create('h3',props,content)
}
/**
 * Creates an H4
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h4=function(props,content){
   return  this.create('h4',props,content)
}


/**
 * Creates an H5
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.h5=function(props,content){
    return this.create('h5',props,content)
}

/**
 * Creates an select
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.select=function(props,content){
   return  this.create('select',props,content)
}

/**
 * Creates an option
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.option=function(props,content){
  return   this.create('option',props,content)
}


/**
 * Creates an table
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.table=function(props,content){
   return  this.create('table',props,content)
}

/**
 * Creates an td
 * @param {object} props The object props
 * @param {boolean} content the internal content
 * @returns {Element404}
 */
Element404.prototype.td=function(props,content){
   return  this.create('td',props,content)
}

/**
 * Creates an tr
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */

Element404.prototype.tr=function(props,content){
    return this.create('tr',props,content)
}


/**
 * Creates an th
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */

Element404.prototype.th=function(props,content){
    return this.create('th',props,content)
}

/**
 * Creates an H3
 * @param {string} message The object props
 * @returns {Element404}
 */
Element404.prototype.text=function(message){
   return  this.create('text',null,message)
}

/**
 * Creates a button
 * @param {object} props The object props
 * @param {function | string} content the internal content
 * @returns {Element404}
 */
Element404.prototype.button=function(props,content){
    return this.create('button',props,content)
}
/**
 * Creates a br
 * @returns {Element404}
 */
Element404.prototype.br=function(){
  return this.create('br',null,null);
}
