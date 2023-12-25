

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


    let create_style = Element404InlineStyle.create_style(this.style_data,args);
    this.root.setAttribute('style',create_style);

}


/**
 * Generate the tenderization
 * @param {HTMLElement || DocumentFragment || Element404}target
 * @returns {Element404}
 * */
Element404.prototype.render= function(target=undefined){

    if(this.child){
        this.father.render();
        return this;
    }

    if(target){
        this.target = target
       if(target instanceof  Element404){
           this.target = target.root
       }
    }

    this.total_render_times+=1;
    this.target.innerHTML = ''
    this.generator()
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
