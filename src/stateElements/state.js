

class State{
    
    constructor(element404,name){
        this.name = name
        this.element404 = element404
        this.value = element404.state[name]

    }
    set(value){
        
        this.element404.state[this.name] = value
        this.value   = value
    }


}