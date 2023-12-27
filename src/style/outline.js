
/**
 * @typedef ComponentStyleState
 * @property {string} state_name
 * @property {string} css_value
 * */

/**
 * @typedef Element404Media
 * @property {string} media_name
 * @property {Array<ComponentStyleState>} states
 *
 * */
class  Element404Outline{
    /**@type {Array<Element404Media>}*/
    medias = [];

    /**
     * @param {number} identifier
     * @param {any} args
     * @param {object || array || function || string} start_value
     * */
    constructor(identifier,args,start_value) {
        this.start_value = start_value
        this.identifier = identifier;
        this.args = args;
    }


    /**
     * @param {string || undefined} media_name
     * @param {string || undefined} state_name
    *@return {ComponentStyleState}
    * */
    get_element(media_name,state_name){
        let media_element = undefined;
        let current_state = undefined;

        for(let current_media of this.medias){
            if(current_media.media_name === media_name){
                media_element = current_media;
                break;
            }
        }

        if(!media_element){
            media_element = {media_name:media_name,states:[]};
            this.medias.unshift(media_element);
        }

        for(let state of media_element.states){
            if(state.state_name === state_name){
                current_state = state;
            }
        }
        if(!current_state){
            current_state = {state_name:state_name,css_value:""};
            media_element.states.unshift(current_state)

        }
        return current_state;
    }

    /**
     * @param {string || undefined} media_name
     * @param {string || undefined} state_name
     * @param {string} value
     * */
    set_text(media_name,state_name,value){
        let media = this.get_element(media_name,state_name);
        media.css_value+= value

    }

    /**
     * @return {string}
     * */
    render(){
        let final_text = ''
        for(let media of this.medias){

            let media_name = media.media_name;
            if(media_name){
                    final_text+=`${media_name} {`
            }

            for(let state of media.states){
                final_text+=`[Element404Identifier="${this.identifier}"] `
                let state_name = state.state_name;
                if(state_name){
                    state_name = state_name.replace(":","");
                    final_text+=`:${state_name}`
                }
                final_text+=`{${state.css_value}}`
            }


            if(media_name){
                final_text+="}"

            }
        }
        return  final_text;
    }
    /**
     * @param {string || undefined} media_name
     * @param {string || undefined} state_name
     * @param  {string || Array || Object} value
     * */
    recursive_create_style(media_name,state_name,value) {


        if(value.constructor.name === 'Object'){

            if(value['mergeIf']){
                /**@type {function}*/
                let merge_if_callback  = value['mergeIf'];

                let evaluation_result = Element404Extras.get_func_result(merge_if_callback,undefined,this.args)
                if(!evaluation_result){
                    return;
                }
            }
            if(value['media']){
                media_name = value['media']
            }
            if(value['state']){
                state_name = value['state']
            }

            const KEYS_TO_IGNORE = ['mergeIf','media','state'];

            for(let key in value){
                if (KEYS_TO_IGNORE.includes(key)){
                    continue;
                }

                let current_value = value[key];
                let executed_value = Element404Extras.get_func_result(current_value,undefined,this.args);
                if(executed_value.constructor.name === 'String'){
                    let formatted_text = `${key}:${executed_value};`
                    this.set_text(media_name,state_name,formatted_text);
                    continue;
                }
                this.recursive_create_style(media_name,state_name,executed_value);
            }
        }




    }

        /**

     * @returns {string}
     * */
    create_style(){

        let executed_value = Element404Extras.get_func_result(this.start_value,undefined,this.args);
        if (executed_value.name === 'String') {
           this.set_text(undefined,undefined,executed_value);
           return this.render();
        }


        this.recursive_create_style(undefined,undefined,executed_value);
        return this.render();


    }

}