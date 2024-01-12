

Element404.prototype.superposition= function(content) {


    let sub_element = new Element404();


    if(this.child){
        sub_element.sub_element(this.root_element,this,this.domElement);
    }
    if(!this.child){
        sub_element.sub_element(this,this,this.domElement);
    }


    sub_element.create_generator(content)
    this.stored_sub_elements.push(sub_element);
    return sub_element


}

Element404.prototype.private_colapse = function (){
    this.smart_state_active = true;
    this.render();
}

Element404.prototype.quantum_clear = function (){

    this.smart_state_active = false;

    let total_active = 0;
    this.father.stored_sub_elements.forEach(e=>{
        if(e.smart_state_active){
            total_active+=1;
        }
    })
    if(total_active  === 0){
        this.clear();

    }
}


Element404.prototype.always_colapse = function (){


    this.render();
    this.smart_state_test = ()=>{
        this.private_colapse();
    }
    return this;

}



Element404.prototype.colapse_always_if = function (test){

    if(test()){
        this.render();
    }

    this.smart_state_test = ()=>{
        let test_result = test();

        if(test_result){
            this.private_colapse();
        }
        if(!test_result){
            this.quantum_clear();
        }

    }
    return this;

}


Element404.prototype.colapse_once_if = function (test){


    if(test()){
        this.smart_state_active = true;
        this.render();
    }

    this.smart_state_test = ()=>{



        let test_result = test();

        if(test_result && !this.smart_state_active){
            this.private_colapse();
        }

        if(!test_result){
            this.quantum_clear();
        }


    }
    return this;

}


Element404.prototype.quantum_render=function(root=false) {

    if(root){
        this.root_element.quantum_render();
    }
    //console.log(this);

    this.stored_sub_elements.forEach(element =>{

        if(element.smart_state_test){
            element.smart_state_test();
        }

        element.quantum_render();

    })
    return this;

}


