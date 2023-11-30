

class StateButton{
    constructor(element404,name,value, content, props){
        
        this.element404 = element404
        this.setter_value = value
        this.content = content

        this.value = null
    
        let old_answer =this.element404.state[name]
        
        if(old_answer){
            this.value = old_answer
        }
        
        this.name = name
        this.props = props ? props:{}
    }

    implement(){
        
        let state_modifier = ()=>{
            this.element404.state[this.name] = this.setter_value

        }

        let formated_props = {
            click: state_modifier
        }    
        
        if(this.value != null){
            formated_props.value  = this.value
        }

        for (const key in this.props){
            formated_props[key] = this.props[key]
        }


        this.element404.button(formated_props,this.content)
    }
}
