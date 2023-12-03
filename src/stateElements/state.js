

class State{
    
    constructor(element404,name){
        this.name = name
        this.element404 = element404
    

    }
    getValue(){
        return  this.element404.state[this.name]
    }

    setValue(value){

        if(value.value != undefined){
            this.element404.state[this.name] = value.value
            return
        }


        this.element404.state[this.name] = value
    }


}