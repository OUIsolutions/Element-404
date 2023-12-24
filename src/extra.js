

let Element404Extras = {


    /**
     * @param {any || function} element
     * @param {function } caster
     * @param {any} props
     * @return {any}
     * */
    get_func_result(element,caster = undefined,props=undefined){
        if(typeof(element) === "function"){
            return this.get_func_result(element(props),caster)
        }
        if(caster){
            return caster(element)
        }

        return  element
    }

}
