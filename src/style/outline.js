
class  Element404Outline{
   
    medias = [];

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
            media_element = {media_name:media_name,component_states:[]};
            this.medias.unshift(media_element);
        }

        for(let state of media_element.component_states){
            if(state.state_name === state_name){
                current_state = state;
            }
        }
        if(!current_state){
            media_element.component_states.unshift({state_name:state_name,css_value:""})
        }
        return current_state;
    }

    
}