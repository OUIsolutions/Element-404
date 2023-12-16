


Element404.prototype.render= function(){

    if(this.child){
        this.father.render();
        return;
    }

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}


