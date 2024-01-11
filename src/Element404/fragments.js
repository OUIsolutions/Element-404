
/**
 * @param {string || function } content
 * @param {Element404Props } props
 * */
Element404.prototype.create_fragment_generator=function(content, props){

    this.generator = (args)=>{
        let father = this.father;
        let grandfather = this.father.father;

        let old_root = grandfather.domElement;
        let old_stored_sub_elements = this.father.stored_sub_elements;
        grandfather.domElement = father.domElement;
        father.stored_sub_elements = this.stored_sub_elements;

        this.set_props(props)

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

        father.stored_sub_elements = old_stored_sub_elements;
        grandfather.domElement = old_root;
    }


}
/**

 * @param {string || Element404Generator || undefined} content
 * @param {Element404Props || undefined} props
 * @returns {Element404 || undefined}
 * */
Element404.prototype.fragment=function( content,props=undefined){


    let sub_element = new Element404();
    sub_element.sub_element(this, this.domElement);
    if(this.child){
        sub_element.create_fragment_generator(content,props)
    }
    if(!this.child){
        sub_element.create_generator(content,props);
    }

    sub_element.generator({});
    this.stored_sub_elements.push(sub_element);

    return sub_element
}



