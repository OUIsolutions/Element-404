/**
 @param {Element404 || DocumentFragment  ||  HTMLElement|| undefined} target
 @returns {DocumentFragment ||HTMLElement}
 */
function  Element404_convert_target(target){
//verifiy if target its an Element404
    if (target instanceof Element404) {
        return target.root;
    }
    return target

}