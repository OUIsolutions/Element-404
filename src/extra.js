
/**
 * @param {any || function} element
 * @return {any}
 * */

function Element404get_func_result(element){
    if(typeof(element) === "function"){
        return Element404get_func_result(element())
    }

    return  element

}