
/**
 * @typedef {function}  Element404_func_generator
 * @param {Element404} main_interface
 **/


/**
 @typedef {function} Element404_func_rootConstructor
 @param {Element404_func_generator} generator
 @param {HTMLElement=} target
 @return {Element404}


 */
/**
 @typedef {function} Element404_func_sub_element
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
 @property {Element404_func_sub_element} sub_element
 @property {Element404_func_rootConstructor} rootConstructor

 tags:

 */


/**
 @typedef {function} Element404_func_createElement404
 @param {Element404_func_generator} generator
 @param {HTMLElement} target
 @return {Element404}
 */


