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
            let sub_elemments = item.find(test_callback);
            result = result.concat(sub_elemments);
        }

    }
    return result;
}
