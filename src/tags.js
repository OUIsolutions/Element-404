



/**
 * Creates a form
 * @param {object} props The object props
 * */
Element404.prototype.input=function(props){
    this.create('input',props,null)
}


/**
 * Creates a Div
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.div=function(props,content){
    this.create('div',props,content)
}


/**
 * Creates an paragraph
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.p=function(props,content){
    this.create('p',props,content)
}


/**
 * Creates a h1
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h1=function(props,content){
    this.create('h1',props,content)
}



/**
 * Creates a g2
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h2=function(props,content){
    this.create('h2',props,content)
}



/**
 * Creates a H3
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h3=function(props,content){
    this.create('h3',props,content)
}
/**
 * Creates an H4
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h4=function(props,content){
    this.create('h4',props,content)
}


/**
 * Creates an H5
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.h5=function(props,content){
    this.create('h5',props,content)
}


Element404.prototype.select=function(props,content){
    this.create('select',props,content)
}

/**
 * Creates an table
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.table=function(props,content){
    this.create('table',props,content)
}

/**
 * Creates an td
 * @param {object} props The object props
 * @param {boolean} content the internal content
 */
Element404.prototype.td=function(props,content){
    this.create('td',props,content)
}

/**
 * Creates an tr
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */

Element404.prototype.tr=function(props,content){
    this.create('tr',props,content)
}


/**
 * Creates an th
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */

Element404.prototype.th=function(props,content){
    this.create('th',props,content)
}

/**
 * Creates an H3
 * @param {string} message The object props
 */
Element404.prototype.text=function(message){
    this.create('text',null,message)
}

/**
 * Creates a button
 * @param {object} props The object props
 * @param {function | string} content the internal content
 */
Element404.prototype.button=function(props,content){
    this.create('button',props,content)
}
/**
 * Creates a br
 */
Element404.prototype.br=function(){
    this.create('br',null,null);
}
