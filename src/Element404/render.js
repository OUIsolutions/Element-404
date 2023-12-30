

Element404.prototype.clear = function (){
    this.root.innerHTML = ''
}


/**
 * @param {any} args
 * */
Element404.prototype.render_style = function (args=undefined){
    if(!this.style_data){
        return;
    }

    if(this.inline_style){
        let create_style = Element404InlineStyle.create_style(this.style_data,args);
        this.root.setAttribute('style',create_style);
    }
    let outline = !this.inline_style;
    if(outline){
        let style_obj = new Element404Outline(this.identifier,args,this.style_data);
        let generated_style = style_obj.create_style();
        if(!this.child_style){
            this.child_style =document.createElement('style');
            this.root.appendChild(this.child_style);
        }
        this.child_style.innerHTML = generated_style;
        this.root.setAttribute('Element404Identifier',this.identifier)
    }

}


/**
 * Generate the tenderization
 * @param {object} args
 * @returns {Element404}
 * */
Element404.prototype.render= function(args={}){
    let formatted_ars =  new Element404Args(args,{});
    let target = formatted_ars.get('target',undefined);
    let render_args = formatted_ars.get('args',undefined);
    let root_render = formatted_ars.get('root_render',false);

    if(this.child && root_render){
        this.father.render(args);
        return  this;
    }

    if(this.child){
        this.generator(args);
        return this;
    }

    if(!render_args){
        render_args = this.render_args;
    }
    this.render_args = render_args;


    if(target){
        this.target = target
       if(target instanceof  Element404){
           if(!this.included_in_father_dom){
               target.stored_sub_elements.unshift(this);
           }

           this.target = target.root
       }
    }

    this.total_render_times+=1;
    this.target.innerHTML = ''
    this.generator(render_args)
    this.target.appendChild(this.root)
    return this;

}

/**
 * @returns {number}
 * */
Element404.prototype.get_total_render = function (){
    if(this.child){
        return this.father.get_total_render();
    }
    return this.total_render_times;
}
