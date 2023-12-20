

class Element404Args{

    constructor(element,default_value) {

        this.element = element;
        if(!element){
            this.element = default_value
        }
    }

    get(key_or_index,default_value){
        let value = this.element[key_or_index];
        if(!value){
            return default_value;
        }
    }

}