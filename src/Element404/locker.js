
Element404.prototype.lock=function(){

    this.locked = true;
    
}

Element404.prototype.is_locked = function (){
    if(this.child){
        return this.father.is_locked();
    }
    return  this.locked;
}

Element404.prototype.unlock=function(){
        this.locked = false;        
}




