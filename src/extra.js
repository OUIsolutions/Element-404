

let Element404Extras = {


    /**
     * @param {any || function} element
     * @param {function } caster
     * @return {any}
     * */
    get_func_result(element,caster = undefined){
        if(typeof(element) === "function"){
            return this.get_func_result(element())
        }
        if(caster){
            return caster(element)
        }

        return  element
    }

}
