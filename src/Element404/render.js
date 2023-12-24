

Element404.prototype.clear = function (){
    this.root.innerHTML = ''
}

/**
 * Generate the tenderization
 * @param {HTMLElement || DocumentFragment }target
 * */
Element404.prototype.render= function(target=undefined){

    if(this.child){
        this.father.render();
        return;
    }

    if(target){
       this.target = target
    }

    this.total_render_times+=1;
    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)

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