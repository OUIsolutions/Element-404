


Element404.prototype.render= function(){

    if(this.child){
        this.father.render();
        return;
    }

    this.target.innerHTML = ''
    this.generator()
    this.target.appendChild(this.root)

    if(this.last_input){
        console.log("pegou aqui");
        this.last_input.input.focus();
        let size = this.last_input.position;
        this.last_input.input.setSelectionRange(size,size)
    }


}


