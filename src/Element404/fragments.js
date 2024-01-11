

/**

 * @param {string || Element404Generator || undefined} content
 * @returns {Element404 || undefined}
 * */
Element404.prototype.fragment=function( content){


    let sub_element = new Element404();




    if(this.child){
        sub_element.sub_element(this.root_element,this,this.domElement);
    }
    if(!this.child){
        sub_element.sub_element(this,this,this.domElement);
    }


    sub_element.create_generator(content)
    sub_element.generator({});


    this.stored_sub_elements.push(sub_element);

    return sub_element
}



