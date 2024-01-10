

Element404.prototype.on_change_div=function(callback) {
    return this.div((element, args) => {
        if(args.exec_callback){

           callback()
        }
    });

}

Element404.prototype.test = function (test){

    if(test()){
        this.smart_state_active = true;
        this.render({args:{exec_callback:true}});
    }

    this.smart_state_test = ()=>{

        if(this.smart_state_active){
            return;
        }
        let test_result = test();

        if(test_result){
            this.smart_state_active = true;
            this.render({args:{exec_callback:true}});
        }
        if(!test_result){
            this.smart_state_active = false;
        }

    }


}


Element404.prototype.smart_render=function() {

    this.stored_sub_elements.forEach(element =>{
        if(element.smart_state_test){
            element.smart_state_test();
            element.smart_render();
        }
    })

}


