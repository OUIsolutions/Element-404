

class StateInput{
    constructor(element404,name, props){
        
        this.element404 = element404
        this.value = null
        let old_answer =this.element404.state[name]
        
        if(old_answer){
            this.value = old_answer
        }

        this.name = name
        this.props = props
    }

    implement(){
        let element404 = this.element404
        let name = this.name
        
        let formated_props = {
            focusout: function(input){
                element404.state[name] = input.value
            }
        }    

        
        if(this.value != null){
            formated_props[value] = this.value
        }
        for (const key in this.props){
            formated_props[key] = this.props[key]
        }
        element404.input(formated_props)
    }
}
