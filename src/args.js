

class Element404Args{
    used =[]

    constructor(element,default_value) {

        this.element = element;
        if(element === undefined || element === null){
            this.element = default_value
        }
    }

    get(key_or_index,default_value){
        this.used.unshift(key_or_index);

        let value = this.element[key_or_index];
        if(value === undefined || value === null){
            return default_value;
        }
        return value
    }
    get_all_except(not_include){

        let formated = {};
        for(let key in this.element){
                if(not_include.includes(key)){
                    continue;
                }
                formated[key] = this.element[key]
        }
        return formated
    }
    get_no_listed(){
        return this.get_all_except(this.used);
    }
}