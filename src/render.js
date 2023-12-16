


Element404.prototype.render= function(){

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)
}


