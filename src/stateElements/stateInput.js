

class StateInput{
    constructor(element404,name, props){
        this.element404 = element404
        this.value = null =this.element404.state[name]
        this.name = name
        this.props = props
    }

    implement(){
        let formated_props = {
            value:this.value,
            focusout: (input)=>{element404.state[this.name] = input.value}
        }    
        for (const key in this.props){
            formated_props[key] = this.props[key]
        }
        this.element404.input({formated_props})
    }
}
