

class Element404Args{

    constructor(element,default_value) {

        this.element = element;
        if(!element){
            this.element = default_value
        }
    }

    get(key_or_index,default_value){
        if(!this.element.hasOwnProperty(key_or_index)){
            return  default_value;
        }
        return this.element[key_or_index];

    }

}