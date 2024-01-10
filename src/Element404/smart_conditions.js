

Element404.prototype.smart_div=function(callback) {

    return this.div((element, args) => {
        if(args.exec_callback){

           callback()
        }
    });


}

Element404.prototype.always_render = function (){


    this.render({args:{exec_callback:true}});
    this.smart_state_test = ()=>{
        this.render({args:{exec_callback:true}});
    }
    return this;

}


Element404.prototype.render_if_always = function (test){

    if(test()){
        this.render({args:{exec_callback:true}});
    }

    this.smart_state_test = ()=>{
        let test_result = test();

        if(test_result){
            this.render({args:{exec_callback:true}});
        }

        if(!test_result){
            this.clear();
        }


    }
    return this;

}


Element404.prototype.render_if_once = function (test){

    if(test()){
        this.smart_state_active = true;
        this.render({args:{exec_callback:true}});
    }

    this.smart_state_test = ()=>{



        let test_result = test();

        if(test_result && !this.smart_state_active){
            this.smart_state_active = true;
            this.render({args:{exec_callback:true}});
        }


        if(!test_result){
            this.clear();
            this.smart_state_active = false;
        }

    }
    return this;

}


Element404.prototype.smart_render=function() {

    //console.log(this);

    this.stored_sub_elements.forEach(element =>{

        if(element.smart_state_test){
            element.smart_state_test();
        }

        element.smart_render();

    })
    return this;

}


