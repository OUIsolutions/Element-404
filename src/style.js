
let Element404Style = {


    /**
     * @param {object} style_value
     * * */
    create_object_style(style_value){
        let style_string = ""

        for (const key in style_value){
            let value = Element404Extras.get_func_result(style_value[key])

            if(key.startsWith("merge")){
                style_string+=this.create_object_style(value)
                continue;
            }

            style_string+=`${key}:${value};`
        }

        return style_string
    },


    /**
     * @param {string || Array || object} value
     * @returns {string}
     * */
    create_style(value){

            if(value instanceof  String){
                return value
            }

            if(value instanceof  Object){
                return this.create_style(value)
            }

    }
}
