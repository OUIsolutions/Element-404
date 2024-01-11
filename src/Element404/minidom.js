/**
 * @typedef {function} Element404Testage
 * @param {Element404} value
 * @return {boolean}
 * */

/**
 * @param {Element404Testage} test_callback
 * @return {Array<Element404>}
 * */
Element404.prototype.find = function (test_callback){
    /**@type {Array<Element404>}*/
    let result = []
    for(let item of this.stored_sub_elements){
        let test_result = test_callback(item);
        if(test_result){
            result.unshift(item);
        }
        
        let recursive_result = item.find(test_callback);
        result = result.concat(recursive_result);
    }
    return result;
}

Element404.prototype.get_value = function (){
    return this.absolute_DomElement.value;
}


/**
 * @param {Element404Testage} test_callback
 * @return {Element404}
 */
Element404.prototype.findOne = function (test_callback){

    for(let item of this.stored_sub_elements){
        let test_result = test_callback(item);
        if(test_result){
            return item;
        }
        let recursive_result = item.findOne(test_callback);
        if(recursive_result){
            return recursive_result;
        }
        

    }
    return null;
}

/**
 * @param {Element404Testage} test_callback
 * @param {any} args
 * @return {Element404}
 */
Element404.prototype.renderMatch = function (test_callback,args){
    let result = this.find(test_callback);
    for(let item of result){
        item.render({args:args});
    }
    return this;
}