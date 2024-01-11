

/**

 * @param {string || Element404Generator || undefined} content
 * @returns {Element404 || undefined}
 * */
Element404.prototype.fragment=function( content){


    let sub_element = new Element404();
    let dom_element = document.createDocumentFragment();
    sub_element.sub_element(this, dom_element);
    sub_element.create_generator(content)

    sub_element.generator({});
    this.absolute_DomElement.appendChild(dom_element);
    this.stored_sub_elements.push(sub_element);

    return sub_element
}



