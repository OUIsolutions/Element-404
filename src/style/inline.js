


let Element404InlineStyle = {


    /**
     * @param {object} style_value
     * @param {any} args
     * @return {string}
     **/
    create_object_style(style_value,args){



        if(style_value['mergeIf']){

            let evaluation_result = Element404Extras.get_func_result(style_value['mergeIf'],undefined,args)
            if(!evaluation_result){
                return ""
            }
        }

        let style_string = ""

        for (const key in style_value){
            let value = Element404Extras.get_func_result(style_value[key],undefined,args)

            if(key === 'mergeif'){
                continue;
            }

            if(value.constructor.name === 'Object'){

                style_string+=this.create_object_style(value,args)
                continue;
            }

            style_string+=`${key}:${value};`
        }

        return style_string
    },



    /**
     * @param {string || Array || object} value
     * @param {any} args
     * @returns {string}
     * */
    create_style(value,args){


            if(value instanceof  String){
                return value
            }

            let formatted_props = args;
            if(!formatted_props){
                formatted_props = {}
            }
            if(value.constructor.name ===  'Object'){
                return this.create_object_style(value,formatted_props)
            }

            if(value.constructor.name === 'Array'){
                let style_string = ''
                for(let element of value){
                    style_string+=this.create_object_style(element,formatted_props)
                }
                return style_string
            }


    }
}
