/**
 * @module
 * @ignore
 */

function Element404(){

        this.child = false;

        this.state_render = false;

        this.total_render_times = 0;

        this.stored_state = {};

        this.locked = false;


 }




Element404.prototype.rootConstructor = function(generator,target){
    this.root = document.createDocumentFragment();
    this.generator = ()=>{generator(this)}
    this.target = target;
    return this;
}

Element404.prototype.sub_element = function(father,root){
    this.father = father;
    this.root = root;
    this.child = true;
    this.state_render = this.father.state_render;
    this.last_input = this.father.last_input;
    this.stored_state = this.father.stored_state;
     return this;
}

function  createElement404(generator,target=undefined){
     let created =  new Element404();
     created.rootConstructor(generator,target);
     return created;
}

