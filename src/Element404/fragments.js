
/**
 * @param {string || function } content
 * */
Element404.prototype.create_fragment_generator=function(content){

    this.generator = (args)=>{
        this.domElement.innerHTML = ELEMENT_404_EMPTY;

        let father = this.father;
        let grandfather = this.father.father;

        let old_grandfather_dom_element = grandfather.domElement;
        let old_father_dom_element = father.domElement;

        let old_father_stored_sub_elements = father.stored_sub_elements;

        grandfather.domElement = this.domElement;
        father.stored_sub_elements = this.stored_sub_elements;



        let formatted_content =  content;
        if(formatted_content instanceof  Function){
            let execution_args = args.args;
            if(!execution_args){
                execution_args = {};
            }
            formatted_content = content(this,execution_args);
        }

        if(formatted_content !== undefined && formatted_content !== null){
            formatted_content = String(formatted_content);
        }

        if(formatted_content){
            let node = document.createTextNode(formatted_content)
            this.domElement.appendChild(node)
        }

        father.stored_sub_elements = old_father_stored_sub_elements;
        father.domElement = old_father_dom_element;
        grandfather.domElement = old_grandfather_dom_element;
    }


}




/**

 * @param {string || Element404Generator || undefined} content
 * @returns {Element404 || undefined}
 * */
Element404.prototype.fragment=function( content){


    let sub_element = new Element404();
    let dom_element = document.createDocumentFragment();
    sub_element.sub_element(this, dom_element);
    sub_element.create_fragment_generator(content)


    sub_element.generator({});
    this.domElement.appendChild(dom_element);
    this.stored_sub_elements.push(sub_element);

    return sub_element
}



