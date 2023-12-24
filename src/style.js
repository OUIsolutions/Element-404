

window.onresize = function (){

    Element404Globals.resize_elements = Element404Globals.resize_elements.filter(element =>{
        return document.contains(element.root);
    })



    Element404Globals.resize_elements .forEach(element =>{
        element.render_style()
    })

}



let Element404Style = {


    /**
     * @param {object} style_value
     * @param {any} props
     * @return {string}
     * * */
    create_object_style(style_value,props){

        if(style_value['mergeIf']){
            let evaluation_result = Element404Extras.get_func_result(style_value['mergeIf'],undefined,props)
            if(!evaluation_result){
                return ""
            }
        }

        let style_string = ""

        for (const key in style_value){
            let value = Element404Extras.get_func_result(style_value[key],undefined,props)

            if(key === 'mergeif'){
                continue;
            }

            if(value.constructor.name === 'Object'){

                style_string+=this.create_object_style(value,props)
                continue;
            }

            style_string+=`${key}:${value};`
        }

        return style_string
    },



    /**
     * @param {string || Array || object} value
     * @param {any} props
     * @returns {string}
     * */
    create_style(value,props){

            if(value instanceof  String){
                return value
            }

            if(value.constructor.name ===  'Object'){
                return this.create_object_style(value,props)
            }

            if(value.constructor.name === 'Array'){
                let style_string = ''
                for(let element of value){
                    style_string+=this.create_object_style(element,props)
                }
                return style_string
            }


    }
}
