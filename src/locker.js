
Element404.prototype.lock=function( ){
    this.locked = true
}


Element404.prototype.waitLock=function( ){
    while (this.locked){}
}

Element404.prototype.unlock=function( ){
    this.locked = false
}
