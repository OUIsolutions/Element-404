

import { Element404 } from './element404.js'



let e = new Element404()
e.div({'test':'aa'},()=>{
    e.create('input',{'onfocusout':(v)=>{console.log(v)}})

    e.create('br')
    e.create('br')

    e.div({'click':()=>{alert("foda se")}},'aaaaaaaaaaa')
})



e.render(document.body)