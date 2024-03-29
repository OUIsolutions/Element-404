

/**
 * Creates a form
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 * */
Element404.prototype.input=function(props=null){
    return this.create('input',null,props)
}


/**
 * Creates a div
 * @param {Element404Generator || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.div=function(content=null,props=null){
    return this.create('div',content,props)
}


/**
 * Creates a style_data tag
 * @param {Element404Generator || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.style=function(content=null, props=null){
    return this.create('style',content,props)
}


/**
 * Creates a nav
 * @param {Element404Generator || string || null} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.nav=function(content=null,props=null){
    return this.create('nav',content,props)
}

/**
 * Creates a code block
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.code = function(content, props = null) {
    return this.create('code', content, props);
}

/**
 * Creates a preformatted text block
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.pre = function(content, props = null) {
    return this.create('pre', content, props);
}

/**
 * Creates an paragraph
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.p=function(content,props=null){
    return this.create('p',content,props)
}


/**
 * Creates a h1
 * @param {Element404Generator || string } content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h1=function(content,props=null){
    return this.create('h1',content,props)
}



/**
 * Creates a h2
 * @param {Element404Generator || string} content the internal content
 * @param {Element404Props || null} props The object props
 * @returns {Element404}
 */
Element404.prototype.h2=function(content,props=null){
    return this.create('h2',content,props)
}



/**
 * Creates an H3
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h3=function(content,props=null){
   return  this.create('h3',content,props)
}

/**
 * Creates an H4
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h4=function(content,props=null){
   return  this.create('h4',content,props)
}


/**
 * Creates a H5
 @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.h5=function(content,props=null){
    return this.create('h5',content,props)
}

/**
 * Creates an select
 @param {Element404Generator} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.select=function(content,props=null){
   return  this.create('select',content,props)
}

/**
 * Creates an option
 * @param {Element404Generator || string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.option=function(content,props=null){
  return  this.create('option',content,props)
}


/**
 * Creates a table
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.table=function(content,props){
   return  this.create('table',content,props)
}

/**
 * Creates a td
 * @param {Element404Generator | string} content the internal content
 @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.td=function(content,props=null){
   return  this.create('td',content,props)
}

/**
 * Creates a tr
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.tr=function(content,props=null){
    return this.create('tr',content,props)
}


/**
 * Creates a th
 * @param {Element404Generator | string} content the internal content
 * @param {Element404Props || null } props The object props
 * @returns {Element404}
 */
Element404.prototype.th=function(content,props=null){
    return this.create('th',content,props)
}

/**
 * Creates an H3
 * @param {string || number} message The object props
 * @returns {Element404}
 */
Element404.prototype.text=function(message){
   return  this.create(undefined,message)
}

/**
 * Creates a button
 * @param {Element404Generator | string || number} content the internal content
 * @param {Element404Props || null  } props The object props
 * @returns {Element404}
 */
Element404.prototype.button=function(content,props=null){
    return this.create('button',content,props)
}
/**
 * Creates a br
 * @returns {Element404}
 */
Element404.prototype.br=function(){
  return this.create('br');
}
