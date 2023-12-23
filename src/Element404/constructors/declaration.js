
/**
 * @typedef {function}  Element404_generator
 * @param {Element404} main_interface
 * */


/**
 @typedef {function} Element404.rootConstructor
 @param {Element404_generator} generator
 @param {HTMLElement=} target
 @return {Element404}


 */
/**
 @typedef {function} Element404.sub_element
 @param {Element404} father
 @param {DocumentFragment || HTMLElement ||  Text} root
 @returns {Element404}
 */


/**
 @typedef {object}  Element404
 @property {Element404} father
 @property {HTMLElement || DocumentFragment} root
 @property {boolean} child
 @property {boolean} state_render
 @property {number} total_render_times
 @property {object} stored_state
 @property {object} locked

 methods:
 @property {Element404.sub_element} sub_element
 @property {rootConstructor} rootConstructor


 tags:
 Creates a function
 @property {Element404.div} div

 */

/**
 @function createElement404
 @param {Element404_generator} generator
 @param {HTMLElement=} target
 @return {Element404}
 */

