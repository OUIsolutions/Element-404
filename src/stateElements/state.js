

class State{
    
    constructor(element404,name,defaultValue){
        this.name = name
        this.element404 = element404
        if(!this.getValue()&& defaultValue !== undefined){
            this.setValue(defaultValue)
        }


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